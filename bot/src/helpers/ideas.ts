const ideas: string[] = [
  "crayon drawing of several cute colorful monsters with ice cream cone bodies on dark blue paper",
  "abstract pencil and watercolor art of a lonely robot holding a balloon",
  '"a sea otter with a pearl earring" by Johannes Vermeer',
  "a stained glass window depicting a hamburger and french fries",
  "a stained glass window depicting a robot",
  "an expressive oil painting of a basketball player dunking, depicted as an explosion of a nebula",
  "a fortune-telling shiba inu reading your fate in a giant hamburger, digital art",
  "a stern-looking owl dressed as a librarian, digital art",
  "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art",
  "3D render of a small pink balloon dog in a light pink room",
  "a pencil and watercolor drawing of a bright city in the future with flying cars",
  "a painting of a fox in the style of Starry Night",
  "a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art",
  "a bowl of soup that looks like a monster, knitted out of wool",
  "a bowl of soup that is also a portal to another dimension, digital art",
  "photograph of an astronaut riding a horse",
  "an armchair in the shape of an avocado",
  "an astronaut lounging in a tropical resort in space, vaporwave",
  "an astronaut lounging in a tropical resort in space, pixel art",
  "teddy bears shopping for groceries, one-line drawing",
  "an astronaut playing basketball with cats in space, digital art",
  "teddy bears shopping for groceries in Japan, ukiyo-e",
  "a cat submarine chimera, digital art",
  "panda mad scientist mixing sparkling chemicals, digital art",
  "an oil pastel drawing of an annoyed cat in a spaceship",
  "an oil painting by Matisse of a humanoid robot playing chess",
  "a surrealist dream-like oil painting by Salvador Dal\xed of a cat playing checkers",
  "synthwave sports car",
  "an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background",
  "a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art"
];

export const getRandomIdea = () => ideas[Math.floor(Math.random() * ideas.length)];
