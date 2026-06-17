/**
 * Default workout data — merged with anything saved in the browser (localStorage).
 * To seed new defaults, edit the workouts arrays below.
 */

const MOTIVATIONAL_QUOTES = [
  "YOU MAY NOT BE THERE YET, BUT YOU ARE CLOSER THAN YOU WERE YETSERDAY :)",
  "It isn't about talent — it's about consistency.",
  "Look like a beauty, train like a beast.",
  "The only bad workout is the one that didn't happen.",
  "Small progress is still progress.",
  "Discipline beats motivation every single time.",
  "Show up. Do the work. Repeat.",
];

const DEFAULT_CATEGORIES = {
  push: {
    id: "push",
    title: "Tri's & Chest",
    tagline: "it isn't about talent it's about consistency",
    buttonLabel: "Press Here",
    page: "push.html",
    workouts: [
      { exercises: ["superset 3x8 (each)- arnold press, shoulder press-more weight", "machine chest press: 4x10", "machine chest fly: 4x10", "katana extension: 4x8", "push up pyramid: minimum 8", "forearm press-up: 3x5"] },
      { exercises: ["bench press: 4x10", "inverted bench press: 4x10", "db t-raise: 4x10", "rope tri pull: 4x8", "push down machine: 4x10", "dips: 4x10", "push ups: 4x5"] },
      { exercises: ["db shoulder press: 4x10", "db tricep extension: 4x10", "barbell skull crushers: 3x8", "low chest fly: 3x8", "cross cable pull: 3x8", "superset 3x6: lat raises, push ups"] },
      { exercises: ["bb shoulder press: 4x8", "db close grip bench press: 4x10", "rope tri pull: 4x8", "chest fly: 4x10", "reverse fly: 3x10", "single arm cross cable: 3x10", "dips: 4x10"] },
      { exercises: ["db arnold press: 4x10", "db single arm tri extension: 4x10", "push down machine: 4x10", "cable chest fly: 4x10", "diamond push ups: 3x8", "push ups + scapula ups: 3x8"] },
      { exercises: ["superset- shoulder press, arnold press: 4x10", "db t-raise: 3x8", "machine chest press: 4x10", "push down machine: 4x10", "bb skull crushers: 3x10", "superset- db kickbacks, db side swings: 4x10"] },
      { exercises: ["bench press: 4x8", "inverted bench press: 4x10", "db single arm tri extension: 4x10", "single arm cross cable pull: 3x8", "cable push down: 4x10", "rope tri extension: 4x10", "superset- db kickbacks, db side swings: 4x10"] },
      { exercises: ["superset- db bench press, db arnold press: 4x10", "db t-raise: 4x6", "low chest fly: 4x8", "katana extension: 4x8", "push ups: 4x10", "superset- db kickbacks, db side swings: 4x10"] },
      { exercises: ["bb shoulder press: 4x8", "db shoulder press: 3x10", "db inverted chest press: 4x10", "db tri extension: 4x10", "machine tri extension: 4x10", "rope tri push down: 4x10", "dips: 4x10", "diamond push-ups: 3x5", "superset- db kickbacks, db side swings: 4x10"] },
      { exercises: ["bb skull crushers: 4x10", "machine chest fly: 4x10", "push down machine: 4x10", "machine chest press: 4x10", "machine tri extension: 4x10", "push up + scapula push up: 2x5", "superset- db kickbacks, db side swings: 4x10"] },
    ],
  },
  pull: {
    id: "pull",
    title: "Bi's & Back",
    tagline: "Look like a beauty, train like a beast",
    buttonLabel: "Bi's and Back Workout",
    page: "pull.html",
    workouts: [
      { exercises: ["db bicep curl: 4x10", "db vertical curl: 4x10", "concentration curl: 4x10", "sitting pull machine: 4x8", "laying pull machine: 25; 3x8", "knee cable pull: 4x10", "db bi curls and side things: light weight"] },
      { exercises: ["db hammer curls: 4x10", "seated row: 4x8", "lat pull down: 3x10", "machine bicep curl: 4x10", "db rows: 3x10", "sitting rope pull back: 4x10", "knee cable pull: 4x10", "db bi curls and side things: light weight"] },
      { exercises: ["pull ups: 3x5", "db seated bicep curls: 4x10", "bb curls: 4x10", "superset 4x8- db hammer curls, db vertical curls:", "sitting pull machine: 4x8", "australian curls: 4x6", "db bi curls and side things: light weight"] },
      { exercises: ["single arm seated row: 4x10", "knee cable pull: 4x10", "laying pull machine: 4x8", "lat pull down machine: 3x8", "cable side bi curls: 3x8", "cable curl:", "db bi curls and side things: light weight"] },
      { exercises: ["superset bicep curls, hammer curls: 4x10", "spider curls: 4x10", "db rows: 4x8", "pull-ups: 2x5", "cable lat pulls: 3x10", "face pulls: 3x10", "db bi curls and side things: light weight"] },
    ],
  },
  legs: {
    id: "legs",
    title: "Legs (more butt than legs hahah)",
    tagline: "somethin cool to write here",
    buttonLabel: "Legs Workout",
    page: "legs.html",
    workouts: [
      { exercises: ["squats heels elevated: minimum weight 65; 3x10", "hack squats: minimum weight 50; 3x8", "toes raises: minimum weight 10; 4x10", "hip adductors: minimum weight 3; 4x10", "hip abductors: minimum weight 4; 4x10", "single leg rdls: minimum weight 15; 3x8", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["squats: minimum weight 75; 4x10", "bulgarian split squats: minimum weight 10; 3x8", "hip bridges: minimum weight 4; 4x10", "kick back: minimum weight 22; 3x10", "kick side: minimum weight 12.5; 3x10", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["leg extension: 4x10", "leg curl: 4x10", "smith machine alternating leg lunges: 3x8", "standing calf raises: 3x20", "db rdls: 4x10", "pistol squats: 3x6", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["hip bridges: 4x10", "glute machine: 4x10", "hip adductors: 4x10", "hip abductors: 4x10", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything", "stairs 5 min!"] },
      { exercises: ["hack squats: 4x10", "leg extension: 4x10", "lying leg curl: 4x8", "sitting calf raise: 4x10", "pistol squats: 3x6", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["squats-heavy: 3x8", "hip bridge: 4x8", "leg press: 4x10", "kick back: 4x10", "kick side", "db rdls: 4x10", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["hack squats: 4x8", "bulgarian split squats: 4x8", "single leg press: 4x10", "hip abductors: 4x10", "single leg rdls: 4x10", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["squats heels elevated: 4x10", "leg press: 4x10", "leg extension: 4x8", "sitting leg curl: 4x8", "pistol squats: 4x5", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["squats-light: 4x10", "hip bridge w hold: 4x8", "single leg press: 4x8", "bulgarian split squat (no weight): 4x12", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
      { exercises: ["hack squats: 4x8", "hip adductors: 4x10", "hip abductors: 4x10", "kick back: 3x10", "kick side: 3x10", "db rdls: 4x10", "butt circuit: fire hydrant extension, back bent leg kick, back straight leg kick,back straight leg hold, back to side, side lifts, side circles, side hold; 15 of everything"] },
    ],
  },
  abs: {
    id: "abs",
    title: "ABS!!!!",
    tagline: "The ab section is a little bit different than the rest. I usually stay pretty consistent with abs and do very similar workouts everytime I'm at the gym. Because of that... here's the daily workout:\n• 1 min plank each way x2\n• 20 crunches each way\n• 15 alternating leg kicks (each side)\n• 15 leg lifts\n• 15 bicycles (each side)\n• 20 \"what the button says\" x2",
    buttonLabel: "button says:",
    page: "abs.html",
    taglineHtml: true,
    workouts: [
      { exercises: ["v-ups"] },
      { exercises: ["tuck ups"] },
      { exercises: ["flutter kicks"] },
      { exercises: ["hollow hold"] },
      { exercises: ["hollow rocks"] },
      { exercises: ["plank hip dips"] },
      { exercises: ["cherry pickers"] },
      { exercises: ["butt ups"] },
      { exercises: ["toe touches"] },
      { exercises: ["alternating leg lifts"] },
    ],
  },
};
