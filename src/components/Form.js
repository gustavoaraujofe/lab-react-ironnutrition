import { useState } from 'react';

function Form(props) {
  const [formData, setFormData] = useState({
    name: '',
    calories: 0,
    image: '',
  });

  //Captura alterações nos campos do Form
  function handleChange(event) {
    let value = event.target.value;
    //Converte o valor de calorias em numero
    if (event.target.name === 'calories') {
      value = event.target.valueAsNumber;
    }
    //Atualiza a formaData com as novas informações do formulário
    setFormData({ ...formData, [event.target.name]: value });
  }

  function handleSubmit(event) {
    //Impede o comportamento padrão do submit de enviar e recarregar a página
    event.preventDefault();
    props.setShowForm(false);
    props.setAddMessage(true);
    //setFoods é a função que atualiza o state do componente App. É adicionado um novo objeto.
    props.setFoods([...props.foods, formData]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Food Name</label>
        <div className="control">
          <input
            className="input"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Food Calories</label>
        <div className="control">
          <input
            type="number"
            className="input"
            name="calories"
            onChange={handleChange}
            value={formData.calories}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          <input
            className="input"
            name="image"
            onChange={handleChange}
            value={formData.image}
          />
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-link mt-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
