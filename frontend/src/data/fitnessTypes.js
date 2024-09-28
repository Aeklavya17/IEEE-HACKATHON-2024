// src/data/fitnessTypes.js
const fitnessTypes = {
    fat: {
      impacts: [
        "Increased risk of chronic diseases such as diabetes and heart disease.",
        "Joint pain and mobility issues.",
        "Low self-esteem and mental health concerns."
      ],
      avoid: [
        "Sugary snacks and beverages.",
        "Processed foods high in trans fats.",
        "Sedentary lifestyle."
      ],
      diet: [
        "Incorporate whole grains (brown rice, quinoa).",
        "Consume plenty of fruits and vegetables.",
        "Choose lean proteins (chicken, fish) and healthy fats (avocado, nuts)."
      ]
    },
    skinny: {
      impacts: [
        "Increased risk of malnutrition and vitamin deficiencies.",
        "Potential for weakened immune response.",
        "Higher likelihood of osteoporosis."
      ],
      avoid: [
        "Skipping meals or following very low-calorie diets.",
        "High-fiber foods without sufficient calorie intake.",
        "Overly restrictive diets."
      ],
      diet: [
        "Eat calorie-dense foods (nut butter, granola).",
        "Include protein-rich foods (eggs, legumes) in every meal.",
        "Consider healthy snacks (trail mix, smoothies) to increase intake."
      ]
    },
    improperSleep: {
      impacts: [
        "Fatigue and decreased cognitive function.",
        "Increased risk of chronic health conditions.",
        "Mood swings and irritability."
      ],
      avoid: [
        "Caffeine and stimulants close to bedtime.",
        "Using electronic devices in bed.",
        "Irregular sleep schedule."
      ],
      diet: [
        "Eat foods rich in magnesium (spinach, bananas) to promote relaxation.",
        "Consider drinking herbal teas (chamomile, valerian root) before bed.",
        "Include sleep-friendly snacks (cottage cheese, kiwi) to aid sleep quality."
      ]
    },
    highStress: {
      impacts: [
        "Can lead to anxiety, depression, and fatigue.",
        "Increases risk of hypertension and heart disease.",
        "Affects sleep quality and overall well-being."
      ],
      avoid: [
        "Overworking without breaks.",
        "Ignoring relaxation techniques and self-care.",
        "Consuming excessive caffeine and alcohol."
      ],
      diet: [
        "Include omega-3 fatty acids (salmon, walnuts) to reduce inflammation.",
        "Consume antioxidants (berries, dark chocolate) to combat stress.",
        "Incorporate whole grains (brown rice, oats) for sustained energy."
      ]
    },
    dehydration: {
      impacts: [
        "Fatigue, headaches, and reduced cognitive function.",
        "May lead to kidney stones and urinary tract infections.",
        "Can affect skin health and overall vitality."
      ],
      avoid: [
        "Excessive caffeine and alcohol, which can lead to dehydration.",
        "Ignoring thirst cues.",
        "Long periods without water intake."
      ],
      diet: [
        "Eat water-rich foods (cucumbers, watermelon) to boost hydration.",
        "Aim for at least 8 glasses of water daily, adjusting for activity level.",
        "Include electrolyte-rich foods (bananas, coconut water) during exercise."
      ]
    },
    lowEnergy: {
      impacts: [
        "Decreased productivity and motivation.",
        "Mood swings and irritability.",
        "Potential for burnout and mental fatigue."
      ],
      avoid: [
        "High-sugar foods that lead to energy crashes.",
        "Sedentary lifestyle without regular physical activity.",
        "Skipping meals, which can exacerbate energy dips."
      ],
      diet: [
        "Include complex carbohydrates (oats, brown rice) for steady energy.",
        "Incorporate protein-rich snacks (nuts, yogurt) to maintain energy levels.",
        "Consume fruits (bananas, apples) for a quick energy boost."
      ]
    },
    poorPosture: {
      impacts: [
        "Can lead to chronic back and neck pain.",
        "May affect breathing and digestion.",
        "Increases risk of tension headaches."
      ],
      avoid: [
        "Sitting for prolonged periods without breaks.",
        "Using poorly designed furniture (chairs, desks).",
        "Slouching while standing or sitting."
      ],
      diet: [
        "Include anti-inflammatory foods (turmeric, ginger) to reduce pain.",
        "Stay hydrated to maintain muscle function.",
        "Eat foods rich in calcium and vitamin D (dairy, leafy greens) for bone health."
      ]
    },
    highCholesterol: {
      impacts: [
        "Increases the risk of heart disease and stroke.",
        "Can lead to plaque buildup in arteries.",
        "May cause chest pain and fatigue."
      ],
      avoid: [
        "Saturated and trans fats (fried foods, baked goods).",
        "High-cholesterol foods (red meat, full-fat dairy).",
        "Excessive sugar and processed carbohydrates."
      ],
      diet: [
        "Consume healthy fats (olive oil, avocados) in moderation.",
        "Increase fiber intake (fruits, vegetables, whole grains).",
        "Include omega-3 fatty acids (fish, walnuts) to help lower cholesterol."
      ]
    }
  };
  
  export default fitnessTypes;
  