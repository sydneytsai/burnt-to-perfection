const recipes = [
    {
        name: "Banana Bread",
        type: "dessert",
        ingredients: [
            "butter",
            "bananas",
            "cinnamon",
            "brown sugar",
            "white sugar",
            "vanilla",
            "eggs",
            "yogurt",
            "oil",
            "flour",
            "baking soda",
            "chocolate"
        ],
        url: "recipes/banana-bread.html",
        image: "recipes/images/banana-bread.jpeg"
    },
    {
        name: "Miso Focaccia",
        type: "side",
        ingredients: [
            "miso",
            "flour",
            "honey",
            "garlic",
            "butter",
            "oil"
        ],
        url: "recipes/miso-focaccia.html",
        image: "recipes/images/miso-focaccia.jpeg"
    },
    {
        name: "Pineapple Buns",
        type: "dessert",
        ingredients: [
            "heavy cream",
            "milk",
            "egg",
            "sugar",
            "flour",
            "yeast",
            "salt",
            "butter",
            "egg",
            "vanilla",
            "baking soda",
            "baking powder"
        ],
        url: "recipes/pineapple-buns.html",
        image: "recipes/images/pineapple-buns.jpeg"
    },
    {
        name: "Cardamom Buns",
        type: "dessert",
        ingredients: [
            "all purpose flour",
            "salt",
            "yeast",
            "water",
            "butter",
            "olive oil",
            "miso",
            "honey",
            "garlic"
        ],
        url: "recipes/cardamom-buns.html",
        image: "recipes/images/cardamom-buns.jpeg"
    },
    {
        name: "Pumpkin Bread",
        type: "dessert",
        ingredients: [
            "butter",
            "pumpkin pie spice",
            "brown sugar",
            "white sugar",
            "salt",
            "vanilla",
            "pumpkin",
            "eggs",
            "flour",
            "baking soda",
            "baking powder"
        ],

        url: "recipes/pumpkin-bread.html",
        image: "recipes/images/pumpkin-bread.jpeg"
    },
    {
        name: "Baked Sago Pudding",
        type: "dessert",
        ingredients: [
            "sago",
            "custard powder",
            "milk",
            "eggs",
            "sugar",
            "evaporated milk",
            "butter"
        ],
        url: "recipes/pumpkin-bread.html",
        image: "recipes/images/pumpkin-bread.jpeg"
    },
    {
        name: "Asian Pasta Salad",
        type: "main",
        ingredients: [
            "firm tofu",
            "soy sauce",
            "garlic powder",
            "paprika",
            "linguine pasta",
            "cucumber",
            "carrot",
            "tofu",
            "romaine lettuce",
            "sesame oil",
            "ponzu"
        ],
        url: "recipes/asian-pasta-salad.html",
        image: "recipes/images/asian-pasta-salad.jpeg"
    },
    {
    name: "Mac and Cheese",
    type: "main",
    ingredients: [
        "pasta",
        "olive oil",
        "unsalted butter",
        "all-purpose flour",
        "milk",
        "heavy cream",
        "cheddar",
        "gruyere",
        "parmesan",
        "smoked paprika",
        "salt",
        "pepper",
        "panko"
    ],
    url: "recipes/mac-and-cheese.html",
    image: "recipes/images/mac-and-cheese.jpeg"
    },
    {
    name: "Miso Mushroom Leek Pasta",
    type: "main",
    ingredients: [
        "olive oil",
        "leeks",
        "white miso",
        "mushrooms",
        "pasta",
        "parmesan",
        "red wine vinegar",
        "parsley"
    ],
    url: "recipes/miso-mushroom-leek-pasta.html",
    image: "recipes/images/miso-mushroom-leek-pasta.jpeg"
    },
    {
    name: "Beef Enoki Rolls",
    type: "main",
    ingredients: [
        "beef",
        "enoki mushrooms",
        "sweet onion",
        "eggs",
        "dashi",
        "green onion",
        "soy sauce",
        "mirin",
        "black pepper"
    ],
    url: "recipes/beef-enoki-rolls.html",
    image: "recipes/images/beef-enoki-rolls.jpeg"
    },
    {
    name: "Chicken Pot Pie",
    type: "main",
    ingredients: [
        "celery",
        "carrots",
        "onion",
        "oil",
        "oil",
        "flour",
        "butter",
        "white wine",
        "chicken stock",
        "parsley",
        "heavy cream",
        "chicken",
        "pie dough",
        "egg"
    ],
    url: "recipes/chicken-pot-pie.html",
    image: "recipes/images/chicken-pot-pie.jpeg"
    },
    {
    name: "Hong Shao Rou",
    type: "main",
    ingredients: [
        "pork belly",
        "oil",
        "sugar",
        "shaoxing wine",
        "soy sauce",
        "white pepper",
        "ginger",
        "green onions",
        "star anise"
    ],
    url: "recipes/hong-shao-rou.html",
    image: "recipes/images/hong-shao-rou.jpeg"
    },
    {
    name: "Steamed Buns",
    type: "side",
    ingredients: [
        "flour",
        "yeast",
        "baking powder",
        "sugar",
        "salt",
        "milk"
    ],
    url: "recipes/steamed-buns.html",
    image: "recipes/images/steamed-buns.jpeg"
    },
    {
    name: "Shortbread",
    type: "dessert",
    ingredients: [
        "flour",
        "sugar",
        "vanilla",
        "butter"
    ],
    url: "recipes/shortbread.html",
    image: "recipes/images/shortbread.jpeg"
    },
    {
    name: "Brown Butter Oatmeal Cookies",
    type: "dessert",
    ingredients: [
        "flour",
        "brown sugar",
        "vanilla",
        "butter",
        "eggs",
        "oats",
        "baking soda",
        "salt"
    ],
    url: "recipes/brown-butter-oatmeal-cookies.html",
    image: "recipes/images/brown-butter-oatmeal-cookies.jpeg"
    },
    {
    name: "Tiramisu",
    type: "dessert",
    ingredients: [
        "egg",
        "sugar",
        "rum",
        "marscapone",
        "heavy cream",
        "lady fingers",
        "espresso"
    ],
    url: "recipes/tiramisu.html",
    image: "recipes/images/tiramisu.jpeg"
    },
    {
    name: "Sweet Potato Miso Creme Brulee",
    type: "dessert",
    ingredients: [
        "egg",
        "heavy cream",
        "sugar",
        "vanilla",
        "white miso",
        "japanese yam"
    ],
    url: "recipes/tiramisu.html",
    image: "recipes/images/tiramisu.jpeg"
    },
    {
    name: "Marry Me Chicken Pasta",
    type: "main",
    ingredients: [
        "pasta",
        "heavy cream",
        "paprika",
        "oregano",
        "chicken stock",
        "chicken",
        "sundried tomatoes",
        "parmesan",
        "garlic",
        "spinach",
        "oilive oil"
    ],
    url: "recipes/marry-me-chicken-pasta.html",
    image: "recipes/images/marry-me-chicken-pasta.jpeg"
    },
    {
    name: "Brown Butter Cornbread Cookies",
    type: "dessert",
    ingredients: [
        "flour",
        "cornmeal",
        "corn"
    ],
    url: "recipes/brown-butter-cornbread-cookies.html",
    image: "recipes/images/brown-butter-cornbread-cookies.jpeg"
    }
];
