import Experience from '../models/Experience.js';

// Seed database with sample data (reusable function)
export const seedDB = async () => {
  try {
    await Experience.deleteMany({});
    
    const sampleExperiences = [
      {
        title: 'Taj Mahal Sunrise Tour',
        location: 'Agra',
        description: 'Witness the iconic Taj Mahal in the soft morning light.',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
        category: 'Heritage',
        minAge: 8,
        includes: 'Entry tickets, expert guide, breakfast, and photography tips. Learn about Mughal architecture and the love story behind this UNESCO World Heritage Site.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '05:30 am', available: 20, booked: 8 },
              { time: '06:00 am', available: 20, booked: 12 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '05:30 am', available: 20, booked: 0 },
              { time: '06:00 am', available: 20, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Ganges Aarti Ceremony',
        location: 'Varanasi',
        description: 'Experience the spiritual Ganga Aarti at Dashashwamedh Ghat.',
        price: 799,
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80',
        category: 'Cultural',
        minAge: 6,
        includes: 'Boat ride on Ganges, guide, aarti viewing spot, and evening snacks. Witness the mesmerizing ritual with hundreds of diyas and chanting priests.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '05:30 pm', available: 15, booked: 7 },
              { time: '06:00 pm', available: 15, booked: 5 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '05:30 pm', available: 15, booked: 0 },
              { time: '06:00 pm', available: 15, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Houseboat Stay in Dal Lake',
        location: 'Srinagar',
        description: 'Overnight stay on traditional Kashmiri houseboat on Dal Lake.',
        price: 5999,
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 5,
        includes: 'Houseboat accommodation, all meals, shikara ride, and mountain views. Experience the floating paradise with Mughal gardens nearby.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '02:00 pm', available: 6, booked: 2 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '02:00 pm', available: 6, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Ranthambore Tiger Safari',
        location: 'Ranthambore',
        description: 'Track the majestic Royal Bengal Tiger in ancient ruins.',
        price: 2799,
        image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&auto=format&fit=crop&q=80',
        category: 'Wildlife',
        minAge: 10,
        includes: 'Canter/jeep safari, naturalist, park fees, and photography opportunities. Explore the historic Ranthambore Fort within the national park.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '06:00 am', available: 6, booked: 4 },
              { time: '03:00 pm', available: 6, booked: 2 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '06:00 am', available: 6, booked: 0 },
              { time: '03:00 pm', available: 6, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Munnar Tea Plantation Tour',
        location: 'Munnar',
        description: 'Walk through lush tea gardens and learn tea processing.',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1563289522-164ff6c74c10?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 8,
        includes: 'Plantation visit, tea factory tour, tea tasting, lunch, and scenic viewpoints. Discover the art of tea making in the Western Ghats.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '09:00 am', available: 15, booked: 6 },
              { time: '02:00 pm', available: 15, booked: 3 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '09:00 am', available: 15, booked: 0 },
              { time: '02:00 pm', available: 15, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Golden Temple Heritage Walk',
        location: 'Amritsar',
        description: 'Explore the spiritual heart of Sikhism and partake in langar.',
        price: 699,
        image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&auto=format&fit=crop&q=80',
        category: 'Cultural',
        minAge: 6,
        includes: 'Temple tour, guide, langar meal, and Jallianwala Bagh visit. Experience community kitchen serving 100,000 meals daily.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '08:00 am', available: 25, booked: 10 },
              { time: '04:00 pm', available: 25, booked: 8 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '08:00 am', available: 25, booked: 0 },
              { time: '04:00 pm', available: 25, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Living Root Bridges Trek',
        location: 'Cherrapunji',
        description: 'Trek to natural bridges formed by living tree roots.',
        price: 2299,
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80',
        category: 'Trekking',
        minAge: 12,
        includes: 'Trekking guide, meals, porter service, and accommodation. Discover the unique double-decker root bridge in the wettest place on Earth.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '07:00 am', available: 10, booked: 4 }
            ]
          },
          {
            date: 'Nov 01',
            times: [
              { time: '07:00 am', available: 10, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Mysore Palace Evening Tour',
        location: 'Mysore',
        description: 'Visit the illuminated Mysore Palace with 97,000 light bulbs.',
        price: 999,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80',
        category: 'Heritage',
        minAge: 6,
        includes: 'Entry tickets, guide, palace illumination viewing, and Chamundi Hills visit. Explore the opulent Indo-Saracenic architecture.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '05:00 pm', available: 20, booked: 12 },
              { time: '06:00 pm', available: 20, booked: 8 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '05:00 pm', available: 20, booked: 0 },
              { time: '06:00 pm', available: 20, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Udaipur Lake Palace Boat Tour',
        location: 'Udaipur',
        description: 'Cruise Lake Pichola and view the stunning Lake Palace.',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1584274623444-4f3607d8f913?w=800&auto=format&fit=crop&q=80',
        category: 'Nature',
        minAge: 5,
        includes: 'Boat ride, guide, refreshments, and City Palace views. Experience the Venice of the East during sunset.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '04:00 pm', available: 18, booked: 9 },
              { time: '05:00 pm', available: 18, booked: 6 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '04:00 pm', available: 18, booked: 0 },
              { time: '05:00 pm', available: 18, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Khajuraho Temple Complex Tour',
        location: 'Khajuraho',
        description: 'Explore UNESCO World Heritage temples with intricate sculptures.',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1609416921992-e1c6e90dba48?w=800&auto=format&fit=crop&q=80',
        category: 'Heritage',
        minAge: 12,
        includes: 'Entry fees, expert guide, light and sound show, and refreshments. Discover 1000-year-old temples with exquisite erotic carvings.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '09:00 am', available: 15, booked: 5 },
              { time: '02:00 pm', available: 15, booked: 3 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '09:00 am', available: 15, booked: 0 },
              { time: '02:00 pm', available: 15, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Sundarbans Mangrove Safari',
        location: 'Sundarbans',
        description: 'Navigate the world\'s largest mangrove forest and spot Bengal tigers.',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=800&auto=format&fit=crop&q=80',
        category: 'Wildlife',
        minAge: 10,
        includes: 'Boat safari, naturalist, meals, accommodation, and crocodile spotting. Explore UNESCO World Heritage Site and Royal Bengal Tiger habitat.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '07:00 am', available: 12, booked: 5 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '07:00 am', available: 12, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Gir National Park Lion Safari',
        location: 'Gir',
        description: 'Track the Asiatic Lion in its last natural habitat.',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1534759926787-89fa60f35848?w=800&auto=format&fit=crop&q=80',
        category: 'Wildlife',
        minAge: 10,
        includes: 'Jeep safari, naturalist guide, park entry, and binoculars. Only place in world to see Asiatic Lions in the wild.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '06:00 am', available: 6, booked: 3 },
              { time: '03:00 pm', available: 6, booked: 2 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '06:00 am', available: 6, booked: 0 },
              { time: '03:00 pm', available: 6, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Kaziranga Elephant Safari',
        location: 'Kaziranga',
        description: 'Ride elephants through grasslands to spot one-horned rhinos.',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&auto=format&fit=crop&q=80',
        category: 'Wildlife',
        minAge: 8,
        includes: 'Elephant ride, mahout, park fees, and tea estate visit. UNESCO World Heritage Site with highest rhino density in the world.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '05:30 am', available: 8, booked: 4 },
              { time: '06:00 am', available: 8, booked: 3 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '05:30 am', available: 8, booked: 0 },
              { time: '06:00 am', available: 8, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Leh-Ladakh Bike Expedition',
        location: 'Leh',
        description: 'Ride through highest motorable passes in the world.',
        price: 12999,
        image: 'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=800&auto=format&fit=crop&q=80',
        category: 'Adventure',
        minAge: 21,
        includes: 'Royal Enfield bike, fuel, mechanic support, accommodation, meals, and permits. 7-day expedition through Khardung La and Pangong Lake.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '08:00 am', available: 10, booked: 6 }
            ]
          },
          {
            date: 'Nov 01',
            times: [
              { time: '08:00 am', available: 10, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Konark Sun Temple Tour',
        location: 'Konark',
        description: 'Marvel at the 13th-century chariot-shaped temple.',
        price: 899,
        image: 'https://images.unsplash.com/photo-1582715395106-8c1c9b0f8b4f?w=800&auto=format&fit=crop&q=80',
        category: 'Heritage',
        minAge: 8,
        includes: 'Entry tickets, archaeologist guide, and Puri beach visit. UNESCO World Heritage Site with intricate stone carvings.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '09:00 am', available: 20, booked: 8 },
              { time: '03:00 pm', available: 20, booked: 5 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '09:00 am', available: 20, booked: 0 },
              { time: '03:00 pm', available: 20, booked: 0 }
            ]
          }
        ]
      },
      {
        title: 'Pushkar Camel Fair Experience',
        location: 'Pushkar',
        description: 'Attend the world\'s largest camel fair and holy lake rituals.',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1610519724852-900fc3b2eb26?w=800&auto=format&fit=crop&q=80',
        category: 'Cultural',
        minAge: 8,
        includes: 'Fair entry, camel ride, cultural performances, guide, and Brahma Temple visit. Experience Rajasthan\'s vibrant culture and traditions.',
        slots: [
          {
            date: 'Oct 29',
            times: [
              { time: '08:00 am', available: 15, booked: 7 },
              { time: '03:00 pm', available: 15, booked: 4 }
            ]
          },
          {
            date: 'Oct 30',
            times: [
              { time: '08:00 am', available: 15, booked: 0 },
              { time: '03:00 pm', available: 15, booked: 0 }
            ]
          }
        ]
      }
    ];

    const inserted = await Experience.insertMany(sampleExperiences);
    return { count: inserted.length };
  } catch (error) {
    // rethrow for caller to handle
    throw error;
  }
}

// Express handler that uses seedDB and responds to HTTP requests
export const seedData = async (req, res) => {
  try {
    const { count } = await seedDB();
    res.json({ message: 'Database seeded successfully', count });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
}