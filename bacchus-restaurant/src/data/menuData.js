// Menu data extracted from Bacchus Restaurant menu
// Allergen icons: gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, nuts, celery, mustard, sesame, sulfur dioxide, lupine, molluscs

export const allergensList = [
  { id: 'gluten', name: 'Gluten', icon: '🌾' },
  { id: 'crustaceans', name: 'Crustaceans', icon: '🦀' },
  { id: 'eggs', name: 'Eggs', icon: '🥚' },
  { id: 'fish', name: 'Fish', icon: '🐟' },
  { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
  { id: 'soybeans', name: 'Soybeans', icon: '🫘' },
  { id: 'milk', name: 'Milk', icon: '🥛' },
  { id: 'nuts', name: 'Nuts', icon: '🌰' },
  { id: 'celery', name: 'Celery', icon: '🥬' },
  { id: 'mustard', name: 'Mustard', icon: '🟡' },
  { id: 'sesame', name: 'Sesame Seeds', icon: '🌱' },
  { id: 'sulfur', name: 'Sulfur Dioxide', icon: 'SO₂' },
  { id: 'lupine', name: 'Lupine', icon: '🫛' },
  { id: 'molluscs', name: 'Molluscs', icon: '🐚' }
];

export const starters = [
  {
    id: 1,
    name: 'Soup of the Day',
    price: 7.50,
    allergens: ['gluten', 'milk', 'celery'],
    description: '',
    icon: '🍲'
  },
  {
    id: 2,
    name: 'Poached Pear Salad',
    price: 11.50,
    allergens: ['milk', 'soybeans', 'sulfur'],
    description: 'Port wine-poached pear, grilled goat cheese, and Parma ham on fresh greens',
    icon: '🥗'
  },
  {
    id: 3,
    name: 'Halloumi Cheese Salad',
    price: 11.00,
    allergens: ['milk', 'soybeans'],
    description: 'Grilled Cypriot halloumi with crisp salad leaves, toasted nuts, and mango strips',
    icon: '🥗'
  },
  {
    id: 4,
    name: 'Meze Platter (For One)',
    price: 12.50,
    allergens: ['gluten', 'milk', 'soybeans', 'sesame'],
    description: 'Stuffed vine leaves, hummus, ezme, feta, tzatziki, and garlic bread',
    icon: '🫓'
  },
  {
    id: 5,
    name: 'Meze Platter (For Two)',
    price: 19.00,
    allergens: ['gluten', 'milk', 'soybeans', 'sesame'],
    description: 'Stuffed vine leaves, hummus, ezme, feta, tzatziki, and garlic bread',
    icon: '🫓'
  },
  {
    id: 6,
    name: 'Garlic King Prawns',
    price: 11.50,
    allergens: ['crustaceans', 'sulfur'],
    description: 'Sautéed in garlic, chili flakes, white wine, and olive oil',
    icon: '🦐'
  },
  {
    id: 7,
    name: 'Grilled Turkish Sucuk',
    price: 11.50,
    allergens: ['gluten', 'eggs', 'milk'],
    description: 'Traditional Turkish garlic sausage with egg, melted mozzarella, and garlic bread',
    icon: '🌭'
  },
  {
    id: 8,
    name: 'Buffalo Chicken Wings',
    price: 10.50,
    allergens: ['milk', 'celery', 'mustard'],
    description: 'Served with house salad and blue cheese dip',
    icon: '🍗'
  },
  {
    id: 9,
    name: 'Chicken Skewer',
    price: 11.50,
    allergens: ['celery', 'milk'],
    description: 'Mediterranean-marinated chicken served with seasonal salad',
    icon: '🍢'
  },
  {
    id: 10,
    name: 'Garlic Bread with Cheese',
    price: 5.50,
    allergens: ['gluten', 'milk'],
    description: '',
    icon: '🥖'
  }
];

export const mainCourses = [
  {
    id: 1,
    name: 'Traditional Chicken \'Sach Tava\'',
    price: 25.50,
    allergens: ['celery'],
    description: 'Sizzling dish of chicken, peppers, garlic, onion and tomato served with rice',
    icon: '🍛'
  },
  {
    id: 2,
    name: 'Seafood Medley Casserole',
    price: 29.50,
    allergens: ['gluten', 'crustaceans', 'fish', 'milk', 'sulfur', 'molluscs'],
    description: 'Salmon, cod, prawns, calamari, mussels in creamy sauce, Parmesan crust, rice',
    icon: '🦞'
  },
  {
    id: 3,
    name: 'Wild Atlantic Salmon',
    price: 25.00,
    allergens: ['fish', 'milk'],
    description: 'Baked salmon on green beans and squash purée with dill cream',
    icon: '🐟'
  },
  {
    id: 4,
    name: 'Seabream Fillet',
    price: 26.50,
    allergens: ['fish', 'milk'],
    description: 'Baked sea bream with green beans, squash purée and dill cream',
    icon: '🐟'
  },
  {
    id: 5,
    name: 'Confit Duck Leg',
    price: 24.50,
    allergens: ['gluten', 'eggs', 'sulfur'],
    description: 'Duck leg & spring rolls with braised red cabbage in orange-anise glaz',
    icon: '🦆'
  },
  {
    id: 6,
    name: 'Mediterranean Lamb Casserole',
    price: 27.00,
    allergens: ['milk'],
    description: 'Diced lamb with vegetables in light chili tomato sauce, topped with cheese, served with rice',
    icon: '🍖'
  },
  {
    id: 7,
    name: 'Lamb Confit in Filo Pastry',
    price: 33.00,
    allergens: ['gluten', 'crustaceans', 'eggs', 'milk', 'sulfur'],
    description: 'Slow-cooked lamb in filo pastry, served with bed of coriander risotto and red wine juice',
    icon: '🥩'
  },
  {
    id: 8,
    name: '15oz T-Bone Steak',
    price: 39.00,
    allergens: ['fish', 'milk', 'sulfur'],
    description: 'Served with grilled prawn, mushrooms, chips, and trio sauce',
    icon: '🥩'
  },
  {
    id: 9,
    name: '12oz Irish Striploin',
    price: 32.00,
    allergens: ['milk', 'sulfur'],
    description: 'Grilled with chips, mushrooms, onions, peppercorn or garlic butter sauce',
    icon: '🥩'
  },
  {
    id: 10,
    name: 'Seafood Platter',
    price: 'Ask',
    allergens: ['fish', 'crustaceans', 'sulfur', 'molluscs'],
    description: 'A generous variety of fresh seafood – please ask for today\'s selection',
    icon: '🦐'
  },
  {
    id: 11,
    name: 'Mixed Grill Platter',
    price: 35.00,
    allergens: ['gluten', 'milk', 'celery', 'mustard'],
    description: 'Kofte, sucuk, liver, lamb chop, chicken shish, salsa, and bulgur',
    icon: '🍗'
  }
];

export const pizzas = [
  {
    id: 1,
    name: 'Margherita',
    price: 13.00,
    allergens: ['gluten', 'milk'],
    description: 'Classic tomato and mozzarella',
    icon: '🍕'
  },
  {
    id: 2,
    name: 'BBQ Chicken',
    price: 16.50,
    allergens: ['gluten', 'milk'],
    description: 'With bacon, peppers, and onions',
    icon: '🍕'
  },
  {
    id: 3,
    name: 'Pepperoni',
    price: 15.50,
    allergens: ['gluten', 'milk'],
    description: '',
    icon: '🍕'
  },
  {
    id: 4,
    name: 'Mighty Meat',
    price: 18.50,
    allergens: ['gluten', 'milk'],
    description: 'Chicken, pepperoni, ham and bacon',
    icon: '🍕'
  },
  {
    id: 5,
    name: 'Hawaiian',
    price: 15.00,
    allergens: ['gluten', 'milk'],
    description: 'Ham and pineapple',
    icon: '🍕'
  },
  {
    id: 6,
    name: 'Cheese Pide',
    price: 17.00,
    allergens: ['gluten', 'milk'],
    description: 'Halloumi, goat cheese, and mozzarella on traditional light pizza dough',
    icon: '🫓'
  },
  {
    id: 7,
    name: 'Sucuk & Cheese Pide',
    price: 17.50,
    allergens: ['gluten', 'milk'],
    description: 'Flatbread topped with spicy Turkish sausage and cheese',
    icon: '🫓'
  }
];

export const pastas = [
  {
    id: 1,
    name: 'Bacchus Fettuccine',
    price: 16.95,
    allergens: ['gluten', 'milk', 'sulfur'],
    description: 'Garlic chicken, bacon, broccoli in creamy wine sauce',
    icon: '🍝'
  },
  {
    id: 2,
    name: 'Seafood Spaghetti',
    price: 22.00,
    allergens: ['gluten', 'crustaceans', 'milk', 'sulfur', 'molluscs'],
    description: 'Mussels, prawns, calamari in creamy pink wine sauce',
    icon: '🍝'
  },
  {
    id: 3,
    name: 'Vegetarian Penne',
    price: 16.50,
    allergens: ['gluten', 'milk'],
    description: 'Mushrooms, onion, broccoli, mixes peppers, tomato sauce',
    icon: '🍝'
  },
  {
    id: 4,
    name: 'Spaghetti Carbonara',
    price: 15.50,
    allergens: ['gluten', 'eggs', 'milk'],
    description: 'Smoky pancetta in a rich creamy egg sauce',
    icon: '🍝'
  },
  {
    id: 5,
    name: 'Penne Alla Vodka',
    price: 17.00,
    allergens: ['gluten', 'milk', 'sulfur'],
    description: 'Bacon, peas, onion in vodka pink sauce',
    icon: '🍝'
  },
  {
    id: 6,
    name: 'Fettuccine Español',
    price: 18.00,
    allergens: ['gluten', 'milk'],
    description: 'Chorizo, sun-dried tomato, mushrooms, pink sauce',
    icon: '🍝'
  },
  {
    id: 7,
    name: 'Seafood Risotto',
    price: 22.00,
    allergens: ['crustaceans', 'milk', 'sulfur', 'molluscs'],
    description: 'Mussels, prawns, calamari, wine sauce',
    icon: '🍚'
  },
  {
    id: 8,
    name: 'Wild Mushroom & Spinach Risotto',
    price: 18.50,
    allergens: ['milk'],
    description: 'Mushrooms, spinach, creamy sauce',
    icon: '🍚'
  }
];

export const desserts = [
  {
    id: 1,
    name: 'Baklava',
    price: 7.50,
    allergens: ['gluten', 'milk', 'nuts'],
    description: 'Traditional Turkish layered pastry with pistachio and syrup',
    icon: '🥮'
  },
  {
    id: 2,
    name: 'Malteser Cheesecake',
    price: 7.50,
    allergens: ['gluten', 'eggs', 'milk'],
    description: 'Homemade, multi-layered, served with chocolate sauce',
    icon: '🍰'
  },
  {
    id: 3,
    name: 'Chocolate Gateau',
    price: 7.50,
    allergens: ['gluten', 'eggs', 'milk'],
    description: 'Rich cake with Chantilly cream and chocolate sauce',
    icon: '🎂'
  },
  {
    id: 4,
    name: 'Poached Pear',
    price: 7.50,
    allergens: ['eggs', 'milk'],
    description: 'Served with meringue and Chantilly cream',
    icon: '🍐'
  },
  {
    id: 5,
    name: 'Selection of Ice Cream',
    price: 7.50,
    allergens: ['milk'],
    description: 'Vanilla, strawberry, chocolate, or mint',
    icon: '🍨'
  },
  {
    id: 6,
    name: 'Apple Pie',
    price: 7.50,
    allergens: ['gluten', 'milk'],
    description: 'Served warm with Chantilly cream',
    icon: '🥧'
  }
];

export const kidsMenu = [
  {
    id: 1,
    name: 'Goujons & Chips',
    price: 8.00,
    allergens: ['gluten', 'eggs', 'milk'],
    icon: '🍟'
  },
  {
    id: 2,
    name: 'Sausage & Chips',
    price: 8.00,
    allergens: ['gluten', 'milk'],
    icon: '🌭'
  },
  {
    id: 3,
    name: 'Penne Pasta',
    price: 8.00,
    allergens: ['gluten', 'milk'],
    description: 'Served with creamy or tomato sauce',
    icon: '🍝'
  },
  {
    id: 4,
    name: 'Kids Pizza',
    price: 8.00,
    allergens: ['gluten', 'milk'],
    description: 'Mini Margherita or Pepperoni',
    icon: '🍕'
  }
];

export const earlyBirdMenu = {
  title: 'Early Bird Menu',
  available: 'Every day between 5:00 PM - 7:00 PM',
  pricing: {
    twoCourses: 29.50,
    threeCourses: 34.50
  },
  starters: [
    'Soup of the Day',
    'Poached Pear Salad',
    'Grilled Halloumi',
    'Garlic Sausage',
    'Crispy Chicken Wings'
  ],
  mains: [
    'Roast Duck',
    'Fresh Atlantic Salmon',
    'Sach Tava (Traditional Turkish Dish)',
    'Prime Irish Steak (€10 Supplement)',
    'Any Pasta or Pizza from our à la carte menu'
  ],
  desserts: [
    'Homemade Ice Cream Selection',
    'Warm Apple Pie',
    'Baklava'
  ]
};

export const restaurantInfo = {
  name: 'Bacchus Restaurant',
  tagline: 'Where the Shannon Flows, Memories Grow',
  address: 'Custume Pier, Athlone, CO. Westmeath',
  phone: '090 645 0433',
  email: 'info@bacchusrestaurant.ie',
  website: 'www.bacchusrestaurant.ie',
  instagram: '@bacchus_restaurant_athlone',
  established: 2016,
  chef: 'Executive Chef Simion George',
  openingHours: {
    monday: { open: '17:00', close: '22:00', lastOrder: '21:00' },
    tuesday: { open: '17:00', close: '22:00', lastOrder: '21:00' },
    wednesday: { open: '17:00', close: '22:00', lastOrder: '21:00' },
    thursday: { open: '17:00', close: '22:00', lastOrder: '21:00' },
    friday: { open: '17:00', close: '22:00', lastOrder: '21:00' },
    saturday: { open: '15:00', close: '22:00', lastOrder: '21:00' },
    sunday: { open: '13:00', close: '21:00', lastOrder: '20:00' }
  },
  about: {
    short: "Athlone's top-rated dining experience. Situated by the scenic Shannon River, we proudly serve Mediterranean-inspired dishes with a modern Irish twist.",
    long: "Established in 2016, Bacchus Restaurant is proudly located along the scenic banks of the River Shannon. Inspired by the Roman god of wine, Bacchus was created to bring the vibrant flavours of the Mediterranean to the heart of Ireland. Since opening, we've been honoured to welcome guests from near and far, offering a unique dining experience where quality, flavour, and atmosphere come together.\n\nOur menu reflects the warmth and richness of Mediterranean cuisine, crafted with fresh, locally sourced ingredients and paired with a carefully selected wine list. From hand-prepared seafood dishes to traditional pastas and grilled meats, each plate is made with passion and precision.\n\nWhether you're joining us for a romantic dinner, a special celebration, or a relaxed evening with friends, Bacchus invites you to unwind, savour, and enjoy. With stunning river views, attentive service, and a love for great food and wine, we aim to create unforgettable moments for our valued guests every day, with every meal."
  },
  policies: {
    allergyNote: 'If you have any allergies or queries please bring it to our attention and we will do our utmost to accommodate you.',
    serviceCharge: '10 service is not included. Any gratuities go directly to the staff serving you.',
    splitBills: 'We are unable to split bills.',
    freshFood: 'Please note that all our food is prepared fresh on premises.',
    latePolicy: 'Please arrive within 15 minutes of your reservation time.'
  }
};
