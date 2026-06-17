#!/usr/bin/env python3
"""Local dev server: serves the site and proxies AI requests to Ollama."""

import json
import os
import urllib.error
import urllib.request
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(os.environ.get("PORT", "8765"))
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "gemma3:4b")


def build_prompt(category_id, title, exercises):
    exercise_sample = exercises[:60]
    return f"""You are a gym workout planner. Create a new workout for: {title} ({category_id}).

Rules:
- Return 5 to 8 exercises.
- Use a mix of exercises from the user's library AND common gym exercises for this muscle group.
- At least 3 exercises should come from or closely match the user's library.
- Add 1 to 3 well-known exercises that fit this category even if not in the library.
- Format each exercise like: "exercise name: 4x10" (abbreviations like db, bb, tri are fine).

User's exercise library:
{json.dumps(exercise_sample)}

Return ONLY valid JSON in this exact shape:
{{"exercises": ["exercise: setsxreps", "..."]}}"""


def call_ollama(category_id, title, exercises):
    payload = json.dumps({
        "model": OLLAMA_MODEL,
        "prompt": build_prompt(category_id, title, exercises),
        "stream": False,
        "format": "json",
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/generate",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=120) as resp:
        body = json.loads(resp.read().decode("utf-8"))

    parsed = json.loads(body.get("response", "{}"))
    exercises_out = parsed.get("exercises", [])

    if not isinstance(exercises_out, list) or len(exercises_out) < 3:
        raise ValueError("Model returned an invalid workout")

    cleaned = [str(ex).strip() for ex in exercises_out if str(ex).strip()]
    if len(cleaned) < 3:
        raise ValueError("Model returned too few exercises")

    return cleaned


class WorkoutHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/api/generate-workout":
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", 0))
            data = json.loads(self.rfile.read(length).decode("utf-8"))
            category_id = data.get("categoryId", "")
            title = data.get("title", category_id)
            exercises = data.get("exercises", [])

            if not category_id:
                self._json_response(400, {"error": "Missing categoryId"})
                return

            result = call_ollama(category_id, title, exercises)
            self._json_response(200, {"exercises": result})

        except urllib.error.URLError:
            self._json_response(503, {
                "error": "Cannot reach Ollama. Make sure it is running (ollama serve)."
            })
        except Exception as exc:
            self._json_response(500, {"error": str(exc)})

    def _json_response(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        if "/api/" in (args[0] if args else ""):
            super().log_message(format, *args)


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(("", PORT), WorkoutHandler)
    print(f"Serving at http://localhost:{PORT}")
    print(f"Ollama model: {OLLAMA_MODEL} ({OLLAMA_URL})")
    server.serve_forever()
