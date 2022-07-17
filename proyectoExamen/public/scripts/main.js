const titleTag = document.getElementById("recepiTitle");

const cuisineTag = document.getElementById("cuisine");
const courseTag = document.getElementById("course");
const dietTag = document.getElementById("diet");

const prepTimeTag = document.getElementById("preparationTime");
const cookTimeTag = document.getElementById("cookingTime");
const totalTimeTag = document.getElementById("totalTime");

const ingredientsTag = document.getElementById("ingredients");
const instructionsTag = document.getElementById("instructions");

const vegetarianList = document.getElementById("VegetarianList");
const fusionList = document.getElementById("Fusion");




titleTag.innerText = recipes[0].TranslatedRecipeName;

cuisineTag.innerText = recipes[0].Cuisine;
courseTag.innerText = recipes[0].Course;
dietTag.innerText = recipes[0].Diet;

prepTimeTag.innerText = recipes[0].PrepTimeInMins + "'";
cookTimeTag.innerText = recipes[0].CookTimeInMins + "'";
totalTimeTag.innerText = recipes[0].TotalTimeInMins + "'";

instructionsTag.innerText = recipes[0].TranslatedInstructions;


ingredientsTag.innerHTML = "";
for (let ing of recipes[0].TranslatedIngredients.split(",")) {
  const li = document.createElement("li");
  li.innerText = ing;
  ingredientsTag.appendChild(li);
}

vegetarianList.innerHTML = "";
fusionList.innerHTML = "";

cuisineTag.onclick = () => {
  fusionList.innerHTML = "";
  for (let rec of recipes) {
    if (rec.Cuisine == courseTag.innerText) {
      const li = document.createElement("li");
      li.innerText = rec.TranslatedRecipeName;
      fusionList.appendChild(li);
    }
  }
}

dietTag.onclick = ()=>{
  vegetarianList.innerHTML = "";
  for (let rec of recipes) {
    if (rec.Diet == dietTag.innerText) {
      const li = document.createElement("li");
      li.innerText = rec.TranslatedRecipeName;
      vegetarianList.appendChild(li);
    }
  }

}


