A recipe app using an API called FORKIFY. Created with 4 models(Recipe,Likes,List and Search) and 4 views files(recipeView,
shoppingListView,searchView and likesView) and all of controllers in the index.js file. Searching a recipe ex. pizza or pasta will show all 
the results from the api of the recipes on the left side 10 at the time with buttons for next or previous page depending on the page. Every clicked recipe will be shown in the middle with more details a like and
add to shopping list buttons. A number of servings per person buttons for incrementing or decrementing the number of persons
which will change all the number of ingredients needed to cook the recipe. When clicked on added on shopping list all the ingredients
are shown on the right with their count which can be incremeneted or decremented. Every ingredient can be deleted from the shopping list.
When clicked on the heart(like button) the recipe is saved on the local storage and is shown immediately on the right side menu for liked
recipes. When clicked again on the same like button the recipe is deleted from the same menu.THe menu dissapears if there are 0 liked 
recipes in the list or appears when there is atleast one liked recipe. There is a directions button on every recipe which takes us to an 
external website with directions of how to cook the recipe.
