/**
 * 10 Fruits Database & Catalog
 * Clean fruit profiles with handcrafted juices, gourmet salads, and nutrition data.
 */
const FRUITS_DATABASE = [
  {
    id: "apple",
    name: "Crisp Apple",
    category: "Pome",
    emoji: "🍎",
    accentColor: "#ef4444",
    tagline: "Crisp, sweet, and bursting with orchard freshness.",
    description: "Rich in soluble pectin fiber and natural flavonoids. Hand-picked Honeycrisp and Gala varieties, ideal for refreshing cold-pressed drinks and artisanal salads.",
    season: "Autumn / Year-round",
    origin: "Washington, USA",
    nutrition: {
      calories: 95,
      carbs: "25g",
      fiber: "4.4g",
      sugar: "19g",
      vitaminC: "14% DV",
      potassium: "195mg"
    },
    items: [
      { id: "apple-j1", name: "Cold-Pressed Gala Juice (350ml)", type: "juice", price: 4.99, icon: "🍹" },
      { id: "apple-j2", name: "Spiced Honeycrisp Cider (500ml)", type: "juice", price: 6.50, icon: "🧃" },
      { id: "apple-s1", name: "Waldorf Apple & Walnut Salad", type: "salad", price: 9.50, icon: "🥗" },
      { id: "apple-s2", name: "Cinnamon Sliced Apple Bowl", type: "salad", price: 4.50, icon: "🥣" }
    ],
    juice: {
      name: "Spiced Honeycrisp Orchard Nectar",
      flavorProfile: "Sweet, tangy with warm cinnamon undertones",
      prepTime: "5 mins",
      price: "$6.50",
      ingredients: [
        "2 large Honeycrisp apples (cored)",
        "1/2 lemon (peeled)",
        "1/4 tsp ground Ceylon cinnamon",
        "100ml sparkling mineral water"
      ],
      steps: [
        "Cold-press the apples and lemon through a slow masticating juicer.",
        "Whisk in the cinnamon until completely dissolved.",
        "Pour over crushed ice and top with sparkling mineral water."
      ]
    },
    salad: {
      name: "Modern Waldorf & Candied Walnut Salad",
      flavorProfile: "Crisp, creamy, savory & nutty",
      prepTime: "12 mins",
      price: "$11.00",
      ingredients: [
        "1 Honeycrisp apple (thin matchsticks)",
        "2 cups organic baby arugula & crisp romaine",
        "1/3 cup candied roasted walnuts",
        "1/4 cup crumbled Gorgonzola or feta cheese",
        "Dijon honey-shallot vinaigrette"
      ],
      steps: [
        "Toss the washed greens lightly with honey-shallot vinaigrette.",
        "Layer with freshly sliced apple matchsticks to prevent bruising.",
        "Garnish generously with crumbled Gorgonzola and warm candied walnuts."
      ]
    }
  },
  {
    id: "banana",
    name: "Golden Banana",
    category: "Tropical Berry",
    emoji: "🍌",
    accentColor: "#eab308",
    tagline: "High-energy superfood packed with electrolytes.",
    description: "Cavendish bananas cultivated in sunny volcanic soils. Dense in potassium, vitamin B6, and prebiotic starch for long-lasting vitality.",
    season: "All Year",
    origin: "Costa Rica",
    nutrition: {
      calories: 105,
      carbs: "27g",
      fiber: "3.1g",
      sugar: "14g",
      vitaminC: "11% DV",
      potassium: "422mg"
    },
    items: [
      { id: "banana-j1", name: "Velvet Silk Banana Smoothie (450ml)", type: "juice", price: 5.50, icon: "🍹" },
      { id: "banana-j2", name: "Banana Peanut Butter Protein Shake", type: "juice", price: 7.00, icon: "🥤" },
      { id: "banana-s1", name: "Caribbean Coconut Banana Salad", type: "salad", price: 8.99, icon: "🥗" },
      { id: "banana-s2", name: "Caramelized Banana Chia Parfait", type: "salad", price: 5.25, icon: "🥣" }
    ],
    juice: {
      name: "Velvet Silk Banana & Oat Smoothie",
      flavorProfile: "Creamy, rich, and naturally sweetened",
      prepTime: "4 mins",
      price: "$7.00",
      ingredients: [
        "2 ripe frozen Cavendish bananas",
        "200ml creamy oat milk",
        "1 tbsp organic almond butter",
        "1 tsp chia seeds"
      ],
      steps: [
        "Add frozen bananas, almond butter, and oat milk into a high-speed blender.",
        "Blend at high RPM for 45 seconds until silky smooth.",
        "Pour into chilled glass and sprinkle chia seeds on top."
      ]
    },
    salad: {
      name: "Caribbean Coconut & Caramelized Banana Bowl",
      flavorProfile: "Tropical, sweet-savory, refreshing",
      prepTime: "15 mins",
      price: "$10.50",
      ingredients: [
        "2 firm bananas (sliced into thick medallions)",
        "1 cup toasted coconut flakes",
        "Mixed baby spinach & mint leaves",
        "Spiced lime & chili dressing"
      ],
      steps: [
        "Flash-sear banana slices in a skillet with maple glaze for 60 seconds.",
        "Toss chilled baby spinach and mint in spiced lime vinaigrette.",
        "Crown with caramelized banana medallions and toasted coconut."
      ]
    }
  },
  {
    id: "orange",
    name: "Sunburst Orange",
    category: "Citrus",
    emoji: "🍊",
    accentColor: "#f97316",
    tagline: "Vibrant citrus shock with unmatched Vitamin C.",
    description: "Sun-drenched Valencia oranges packed with natural bioflavonoids, essential oils, and juicy citrus pulp for immunity and refreshment.",
    season: "Winter / Spring",
    origin: "Valencia, Spain",
    nutrition: {
      calories: 62,
      carbs: "15g",
      fiber: "3.1g",
      sugar: "12g",
      vitaminC: "116% DV",
      potassium: "237mg"
    },
    items: [
      { id: "orange-j1", name: "Fresh-Squeezed Valencia Orange Juice", type: "juice", price: 4.75, icon: "🍹" },
      { id: "orange-j2", name: "Zesty Orange Ginger Immunity Elixir", type: "juice", price: 6.25, icon: "🧃" },
      { id: "orange-s1", name: "Sicilian Fennel & Orange Segment Salad", type: "salad", price: 10.50, icon: "🥗" },
      { id: "orange-s2", name: "Citrus Mint & Honey Fruit Cup", type: "salad", price: 4.80, icon: "🥣" }
    ],
    juice: {
      name: "Zesty Sunrise Citrus & Ginger Elixir",
      flavorProfile: "Bright, punchy, immunity-boosting kick",
      prepTime: "6 mins",
      price: "$6.00",
      ingredients: [
        "3 Valencia oranges (freshly hand-squeezed)",
        "1 inch knob fresh cold-pressed ginger",
        "1/2 lemon juice"
      ],
      steps: [
        "Extract juice from fresh oranges and fresh ginger root.",
        "Stir in lemon juice and a micro-pinch of pink mineral salt.",
        "Strain over large clear ice cubes and garnish with mint."
      ]
    },
    salad: {
      name: "Sicilian Orange, Fennel & Kalamata Salad",
      flavorProfile: "Crisp, botanical, salty & peppery",
      prepTime: "10 mins",
      price: "$12.00",
      ingredients: [
        "2 Valencia oranges (supremed into jewel segments)",
        "1 bulb crisp Florence fennel (paper-thin shaved)",
        "1/3 cup pitted Kalamata olives",
        "Extra virgin cold-pressed olive oil"
      ],
      steps: [
        "Submerge sliced fennel in ice bath for 5 mins for extra crunch.",
        "Arrange orange segments, drained fennel, and Kalamata olives.",
        "Drizzle high-phenolic olive oil and season with coarse pepper."
      ]
    }
  },
  {
    id: "mango",
    name: "Alphonso Mango",
    category: "Tropical Drupe",
    emoji: "🥭",
    accentColor: "#fbbf24",
    tagline: "The undisputed King of Fruits.",
    description: "Renowned globally for its golden velvety flesh, saffron aroma, and rich floral sweetness. Packed with vitamins A and C.",
    season: "Spring / Summer",
    origin: "Ratnagiri, India",
    nutrition: {
      calories: 99,
      carbs: "25g",
      fiber: "2.6g",
      sugar: "23g",
      vitaminC: "67% DV",
      potassium: "277mg"
    },
    items: [
      { id: "mango-j1", name: "Royal Alphonso Mango Nectar (350ml)", type: "juice", price: 5.75, icon: "🍹" },
      { id: "mango-j2", name: "Cardamom Pistachio Mango Lassi", type: "juice", price: 7.50, icon: "🥤" },
      { id: "mango-s1", name: "Thai Spicy Mango & Peanut Salad", type: "salad", price: 11.00, icon: "🥗" },
      { id: "mango-s2", name: "Diced Golden Mango Bowl with Lime", type: "salad", price: 5.50, icon: "🥣" }
    ],
    juice: {
      name: "Royal Golden Mango Lassi Cooler",
      flavorProfile: "Velvety, aromatic cardamom & mango cream",
      prepTime: "5 mins",
      price: "$7.50",
      ingredients: [
        "1 cup ripe Alphonso mango puree",
        "1/2 cup Greek probiotic yogurt",
        "2 crushed green cardamom pods",
        "1 tsp raw wildflower honey"
      ],
      steps: [
        "Blend mango puree, chilled yogurt, and crushed cardamom until frothy.",
        "Pour into tall frosted glass.",
        "Top with vibrant green crushed pistachio and saffron strand."
      ]
    },
    salad: {
      name: "Thai Mango, Chili & Toasted Peanut Bowl",
      flavorProfile: "Sweet, sour, spicy, umami explosion",
      prepTime: "14 mins",
      price: "$11.50",
      ingredients: [
        "1 semi-ripe Alphonso mango (julienned)",
        "1 cup shredded red cabbage & carrots",
        "Handful fresh cilantro & Thai basil",
        "1/4 cup crushed roasted peanuts"
      ],
      steps: [
        "Whisk lime juice, tamarind, touch of chili flakes, and sesame oil.",
        "Combine julienned mango with shredded cabbage and herbs in a bowl.",
        "Toss thoroughly and sprinkle with toasted crunchy peanuts."
      ]
    }
  },
  {
    id: "strawberry",
    name: "Garden Strawberry",
    category: "Aggregate",
    emoji: "🍓",
    accentColor: "#f43f5e",
    tagline: "Ruby red sweetness with fresh garden aroma.",
    description: "Deep red strawberries harvested at peak ripeness. Dense in ellagic acid antioxidants, manganese, and bright natural sweetness.",
    season: "Spring / Summer",
    origin: "California, USA",
    nutrition: {
      calories: 49,
      carbs: "12g",
      fiber: "3.0g",
      sugar: "7g",
      vitaminC: "149% DV",
      potassium: "233mg"
    },
    items: [
      { id: "strawberry-j1", name: "Ruby Cold-Pressed Strawberry Juice", type: "juice", price: 5.25, icon: "🍹" },
      { id: "strawberry-j2", name: "Strawberry Basil Lemonade Sparkler", type: "juice", price: 6.80, icon: "🧃" },
      { id: "strawberry-s1", name: "Spinach, Goat Cheese & Strawberry Salad", type: "salad", price: 11.50, icon: "🥗" },
      { id: "strawberry-s2", name: "Quartered Berries with Aged Balsamic", type: "salad", price: 5.20, icon: "🥣" }
    ],
    juice: {
      name: "Ruby Strawberry Basil Sparkler",
      flavorProfile: "Effervescent, aromatic herbal berry crush",
      prepTime: "5 mins",
      price: "$6.80",
      ingredients: [
        "1.5 cups fresh organic strawberries",
        "4 fresh sweet basil leaves",
        "1/2 lime juice",
        "200ml artisanal tonic water"
      ],
      steps: [
        "Muddle fresh strawberries and bruised basil leaves in a shaker.",
        "Add fresh lime juice and ice; shake vigorously.",
        "Strain into a champagne flute and top with chilled tonic water."
      ]
    },
    salad: {
      name: "Baby Spinach, Strawberry & Aged Balsamic Bowl",
      flavorProfile: "Sweet berry harmony with tart balsamic glaze",
      prepTime: "8 mins",
      price: "$12.50",
      ingredients: [
        "1.5 cups quartered fresh strawberries",
        "3 cups fresh baby tender spinach",
        "1/3 cup toasted pecan halves",
        "1/4 cup crumbled goat cheese"
      ],
      steps: [
        "Toss baby spinach with cold-pressed olive oil.",
        "Scatter sliced ruby strawberries and toasted pecans evenly.",
        "Drizzle zigzagged aged balsamic glaze and goat cheese crumbles."
      ]
    }
  },
  {
    id: "blueberry",
    name: "Wild Blueberry",
    category: "True Berry",
    emoji: "🫐",
    accentColor: "#3b82f6",
    tagline: "The cognitive antioxidant powerhouse.",
    description: "Deep indigo berries rich in anthocyanin pigments. Celebrated for brain health, neuro-protection, and velvety sweet-tart taste.",
    season: "Summer",
    origin: "Maine, USA",
    nutrition: {
      calories: 84,
      carbs: "21g",
      fiber: "3.6g",
      sugar: "15g",
      vitaminC: "24% DV",
      potassium: "114mg"
    },
    items: [
      { id: "blueberry-j1", name: "Wild Indigo Antioxidant Berry Juice", type: "juice", price: 5.95, icon: "🍹" },
      { id: "blueberry-j2", name: "Blueberry Acai Chia Super-Smoothie", type: "juice", price: 7.20, icon: "🥤" },
      { id: "blueberry-s1", name: "Quinoa, Kale & Wild Blueberry Salad", type: "salad", price: 12.00, icon: "🥗" },
      { id: "blueberry-s2", name: "Fresh Chilled Berry Snack Cup", type: "salad", price: 4.90, icon: "🥣" }
    ],
    juice: {
      name: "Midnight Indigo Antioxidant Blast",
      flavorProfile: "Deep, earthy berry intensity with lemon zest",
      prepTime: "4 mins",
      price: "$7.20",
      ingredients: [
        "1.5 cups wild blueberries",
        "150ml pure coconut water",
        "1 tsp acai berry powder",
        "1 tbsp organic chia seeds"
      ],
      steps: [
        "Blend blueberries with chilled coconut water and acai powder.",
        "Gently fold in chia seeds and let rest 2 minutes to thicken.",
        "Serve with lemon zest floating on top."
      ]
    },
    salad: {
      name: "Wild Blueberry, Quinoa & Kale Power Bowl",
      flavorProfile: "Nutrient-dense, chewy, earthy & vibrant",
      prepTime: "16 mins",
      price: "$13.00",
      ingredients: [
        "1 cup wild blueberries",
        "1 cup fluffy cooked tricolor quinoa",
        "2 cups finely massaged Tuscan dinosaur kale",
        "1/4 cup toasted pumpkin seeds"
      ],
      steps: [
        "Massage chopped kale with a drop of olive oil to soften fiber.",
        "Fold in cooled tricolor quinoa and crisp pumpkin seeds.",
        "Toss gently with wild blueberries and lemon-tahini dressing."
      ]
    }
  },
  {
    id: "pineapple",
    name: "Tropical Pineapple",
    category: "Multiple Fruit",
    emoji: "🍍",
    accentColor: "#facc15",
    tagline: "Sun-soaked bromelain tropical explosion.",
    description: "Sweet gold pineapple loaded with bromelain digestive enzyme, manganese, and vibrant Caribbean tropical sweetness.",
    season: "Year-Round",
    origin: "Maui, Hawaii",
    nutrition: {
      calories: 82,
      carbs: "22g",
      fiber: "2.3g",
      sugar: "16g",
      vitaminC: "131% DV",
      potassium: "180mg"
    },
    items: [
      { id: "pineapple-j1", name: "Maui Gold Pineapple Cold-Press", type: "juice", price: 5.20, icon: "🍹" },
      { id: "pineapple-j2", name: "Pineapple Coconut Piña Cooler", type: "juice", price: 6.75, icon: "🧃" },
      { id: "pineapple-s1", name: "Charred Pineapple, Avocado & Lime Bowl", type: "salad", price: 10.95, icon: "🥗" },
      { id: "pineapple-s2", name: "Spiced Pineapple Spears with Tajín", type: "salad", price: 4.50, icon: "🥣" }
    ],
    juice: {
      name: "Maui Gold Pineapple & Mint Refresher",
      flavorProfile: "Ultra-refreshing sweet tropical burst",
      prepTime: "5 mins",
      price: "$6.75",
      ingredients: [
        "2 cups diced fresh Maui gold pineapple",
        "1/2 cup fresh young coconut water",
        "6 fresh spearmint leaves",
        "1/2 lime juice"
      ],
      steps: [
        "Masticate fresh pineapple through a high-yield juicer.",
        "Shake cold pineapple juice with coconut water, lime, and crushed mint.",
        "Serve over glacier ice with a pineapple triangular wheel."
      ]
    },
    salad: {
      name: "Charred Pineapple, Avocado & Jalapeño Bowl",
      flavorProfile: "Smoky, spicy, creamy and tangy",
      prepTime: "15 mins",
      price: "$11.50",
      ingredients: [
        "1.5 cups grilled pineapple spears",
        "1 ripe Haas avocado (cubed)",
        "1 small jalapeño (thinly sliced)",
        "1/4 cup diced red onion & cilantro"
      ],
      steps: [
        "Grill pineapple rings over high flame until deep grill marks form.",
        "Dice charred pineapple and combine with avocado and jalapeño.",
        "Toss gently with lime juice, smoked paprika, and sea salt."
      ]
    }
  },
  {
    id: "watermelon",
    name: "Crimson Watermelon",
    category: "Pepo Berry",
    emoji: "🍉",
    accentColor: "#ec4899",
    tagline: "92% pure hydration and natural lycopene.",
    description: "The ultimate summer hydrator. Sourced from seedless crimson sweet harvests, rich in L-citrulline amino acids and heart-healthy lycopene.",
    season: "Summer",
    origin: "Georgia, USA",
    nutrition: {
      calories: 46,
      carbs: "11g",
      fiber: "0.6g",
      sugar: "9g",
      vitaminC: "21% DV",
      potassium: "170mg"
    },
    items: [
      { id: "watermelon-j1", name: "Crimson Watermelon Mint Hydrator (500ml)", type: "juice", price: 4.80, icon: "🍹" },
      { id: "watermelon-j2", name: "Watermelon Lime Agua Fresca", type: "juice", price: 5.50, icon: "🧃" },
      { id: "watermelon-s1", name: "Greek Feta, Mint & Watermelon Salad", type: "salad", price: 9.80, icon: "🥗" },
      { id: "watermelon-s2", name: "Cold Watermelon Cubes Tub", type: "salad", price: 3.99, icon: "🥣" }
    ],
    juice: {
      name: "Chilled Crimson Watermelon & Lime Cooler",
      flavorProfile: "Subtly sweet, crisp, ultra-hydrating",
      prepTime: "3 mins",
      price: "$5.50",
      ingredients: [
        "3 cups seedless crimson watermelon cubes",
        "Juice of 1 key lime",
        "Small pinch of Himalayan black salt",
        "Fresh mint leaves"
      ],
      steps: [
        "Cold blend chilled watermelon cubes for 20 seconds.",
        "Stir in freshly squeezed key lime juice and mineral salt.",
        "Pour into tall frosted glasses with mint garnish."
      ]
    },
    salad: {
      name: "Greek Watermelon, Barrel-Aged Feta & Mint",
      flavorProfile: "Salty-sweet perfection with cooling herbs",
      prepTime: "7 mins",
      price: "$10.00",
      ingredients: [
        "3 cups cold watermelon (cubed 1-inch)",
        "100g authentic Greek feta cheese",
        "1/4 cup freshly torn spearmint leaves",
        "2 tbsp extra virgin olive oil"
      ],
      steps: [
        "Arrange cold watermelon cubes in a chilled ceramic platter.",
        "Crumble authentic brine feta cheese liberally across top.",
        "Garnish with mint leaves and a ribbon of extra virgin olive oil."
      ]
    }
  },
  {
    id: "peach",
    name: "Velvet Peach",
    category: "Stone Fruit",
    emoji: "🍑",
    accentColor: "#fb923c",
    tagline: "Velvety skin, floral perfume, and dripping sweetness.",
    description: "Freestone Elberta and Georgia peaches picked sun-warm from orchards. Rich in beta-carotene, vitamin E, and natural aromatic esters.",
    season: "Summer",
    origin: "Georgia / Provence",
    nutrition: {
      calories: 59,
      carbs: "14g",
      fiber: "2.3g",
      sugar: "13g",
      vitaminC: "17% DV",
      potassium: "285mg"
    },
    items: [
      { id: "peach-j1", name: "Bellini Peach Nectar Sparkler", type: "juice", price: 5.50, icon: "🍹" },
      { id: "peach-j2", name: "Sweet Peach & Ginger Iced Tea", type: "juice", price: 6.00, icon: "🧃" },
      { id: "peach-s1", name: "Grilled Peach, Burrata & Prosciutto Salad", type: "salad", price: 13.50, icon: "🥗" },
      { id: "peach-s2", name: "Fresh White Peach Slices in Honey", type: "salad", price: 4.75, icon: "🥣" }
    ],
    juice: {
      name: "Bellini Peach Nectar & Elderflower Fizz",
      flavorProfile: "Floral, lush, fizzy botanical nectar",
      prepTime: "6 mins",
      price: "$7.25",
      ingredients: [
        "2 ripe whole peaches (blanched & peeled)",
        "1 tbsp organic elderflower cordial",
        "150ml sparkling Perrier water"
      ],
      steps: [
        "Puree fresh peaches with elderflower cordial until velvet-textured.",
        "Spoon 3 tbsp peach puree into bottom of glass.",
        "Top gently with sparkling mineral water for ombre sunrise effect."
      ]
    },
    salad: {
      name: "Grilled Peach, Burrata & Prosciutto Salad",
      flavorProfile: "Decadent, creamy, savory, smoky-sweet",
      prepTime: "12 mins",
      price: "$14.50",
      ingredients: [
        "2 peaches (sliced in thick wedges)",
        "1 ball fresh Italian Burrata (150g)",
        "3 slices San Daniele Prosciutto",
        "2 cups wild arugula"
      ],
      steps: [
        "Char peach wedges on hot grill pan for 90 seconds per side.",
        "Tear burrata open in the center of an arugula bed.",
        "Tuck grilled peaches and delicate prosciutto ribbons around burrata."
      ]
    }
  },
  {
    id: "grape",
    name: "Royal Grape",
    category: "True Berry",
    emoji: "🍇",
    accentColor: "#8b5cf6",
    tagline: "Jewels of the vine loaded with resveratrol.",
    description: "Muscat and Autumn Royal table grapes harvested from historic Mediterranean vineyards. Packed with proanthocyanidins and crisp bursting sweetness.",
    season: "Late Summer / Autumn",
    origin: "Bordeaux, France",
    nutrition: {
      calories: 104,
      carbs: "27g",
      fiber: "1.4g",
      sugar: "23g",
      vitaminC: "27% DV",
      potassium: "288mg"
    },
    items: [
      { id: "grape-j1", name: "Concord Royal Grape Cold-Press", type: "juice", price: 5.25, icon: "🍹" },
      { id: "grape-j2", name: "Grape Sparkler with Lemon Thyme", type: "juice", price: 6.50, icon: "🧃" },
      { id: "grape-s1", name: "Roasted Grape, Arugula & Goat Cheese", type: "salad", price: 11.20, icon: "🥗" },
      { id: "grape-s2", name: "Chilled Muscat Table Grape Cup", type: "salad", price: 4.25, icon: "🥣" }
    ],
    juice: {
      name: "Concord Royal Crush & Rosemary Tonic",
      flavorProfile: "Deep wine-like richness with piney herbal notes",
      prepTime: "5 mins",
      price: "$6.50",
      ingredients: [
        "2 cups purple seedless grapes",
        "1 sprig fresh rosemary",
        "1/2 lemon juice",
        "100ml premium tonic water"
      ],
      steps: [
        "Press grapes through fine mesh with fresh lemon juice.",
        "Torched rosemary sprig slightly to release fragrant essential oils.",
        "Serve over clear ice sphere with rosemary sprig stirrer."
      ]
    },
    salad: {
      name: "Roasted Grape, Goat Cheese & Walnut Flatbread Salad",
      flavorProfile: "Rich, caramelized, earthy & tangy",
      prepTime: "15 mins",
      price: "$12.50",
      ingredients: [
        "1.5 cups red seedless grapes",
        "2 cups baby butterhead lettuce",
        "1/3 cup creamy goat cheese",
        "1/4 cup toasted walnuts"
      ],
      steps: [
        "Blister grapes in hot oven until skins burst and caramelize.",
        "Arrange tender lettuce leaves and dollops of goat cheese.",
        "Scatter warm blistered grapes and toasted walnuts with port reduction."
      ]
    }
  }
];

function getFruitById(id) {
  return FRUITS_DATABASE.find(f => f.id.toLowerCase() === (id || "").toLowerCase()) || FRUITS_DATABASE[0];
}

function getAllFruits() {
  return FRUITS_DATABASE;
}
