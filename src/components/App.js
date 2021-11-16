import foodsSrc from '../foods.json';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import Foodbox from './Foodbox';
import Form from './Form';
import SearchBar from './SearchBar';
import TodaysFoods from './TodaysFoods';

function App() {
  const [foods, setFoods] = useState(foodsSrc);
  const [foodsBkp, setFoodsBkp] = useState(foodsSrc);
  const [showForm, setShowForm] = useState(false);
  const [todaysFoods, setTodaysFoods] = useState([]);
  const [addMessage, setAddMessage] = useState(false);

  //Toda vez que o foodBkp receber uma nova comida, atualize tb o foods
  useEffect(() => {
    setFoods([...foodsBkp]);
  }, [foodsBkp]);

  //Filtra a array para retornar apenas elementos buscados
  function filterFoods(searchTerm) {
    const filtred = foodsBkp.filter((currentFoodObj) => {
      return currentFoodObj.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
    });

    setFoods(filtred);
  }

  function addTodaysFood(foodObj) {
    //Utiliza função pra verificar se a comida já existe na lista
    const foodObjIndex = searchFood(foodObj.name);

    //Verifica se já existe uma comida com esse nome na lista de comidas atual
    if (foodObjIndex > -1) {
      //Cria um clone da array de comidas para não modificar a original
      const todaysFoodsClone = [...todaysFoods];

      //Acessa o objeto a ser atualizado através do indice
      const foodObjToUpdate = todaysFoodsClone[foodObjIndex];

      foodObjToUpdate.quantity = foodObjToUpdate.quantity + foodObj.quantity;

      //Atualiza o state com o clone da array modificada
      return setTodaysFoods(todaysFoodsClone);
    }

    //Caso não exista, adicione o objeto inteiro
    setTodaysFoods([...todaysFoods, foodObj]);
  }

  //Procura um indice pra verificar se a comida já existe na lista
  function searchFood(food) {
    return todaysFoods.findIndex(
      (currentFoodObj) => currentFoodObj.name === food
    );
  }

  function todaysFoodsDelete(foodDeleteName) {
    //Utiliza função pra verificar o index do Obj
    const foodObjIndex = searchFood(foodDeleteName);

    //Cria um clone da lista
    const todaysFoodsClone = [...todaysFoods];

    //Remove o item do array clone
    todaysFoodsClone.splice(foodObjIndex, 1);

    //Atualiza o state com o clone da array modificada
    setTodaysFoods(todaysFoodsClone);
  }

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>
      <div>
        <SearchBar filterFoods={filterFoods} />
      </div>

      <div className="column" style={{ width: '500px' }}>
        {addMessage && !showForm ? (
          <div className="notification is-success column is-half">
            <button
              className="delete"
              onClick={() => setAddMessage(false)}
            ></button>
            <strong>Added food!</strong>
          </div>
        ) : null}
        <button
          className="button is-link"
          onClick={() => setShowForm(!showForm)}
        >
          Add Food
        </button>

        {showForm ? (
          <Form
            foods={foodsBkp}
            setFoods={setFoodsBkp}
            setShowForm={setShowForm}
            setAddMessage={setAddMessage}
          />
        ) : null}
      </div>
      <div className="columns">
        <div className="column mr-4">
          {foods.map((currentFoodObj) => {
            return (
              <Foodbox
                key={currentFoodObj.name}
                name={currentFoodObj.name}
                calories={currentFoodObj.calories}
                image={currentFoodObj.image}
                quantity={currentFoodObj.quantity}
                addTodaysFood={addTodaysFood}
              />
            );
          })}
        </div>
        <div className="column content">
          <TodaysFoods
            todaysFoods={todaysFoods}
            todaysFoodsDelete={todaysFoodsDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
