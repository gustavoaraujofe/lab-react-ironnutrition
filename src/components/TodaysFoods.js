function TodaysFoods(props) {
  return (
    <>
      <h2 className="subtitle">Today's foods</h2>
      <ul>
        {props.todaysFoods.map((todaysFoodsObj) => {
          return (
            <li key={todaysFoodsObj.name}>
              {todaysFoodsObj.quantity} {todaysFoodsObj.name} ={' '}
              {todaysFoodsObj.calories * todaysFoodsObj.quantity} cal{' '}
              <button
                onClick={() => props.todaysFoodsDelete(todaysFoodsObj.name)}
                className="delete mt-1 ml-2"
              ></button>
            </li>
          );
        })}
      </ul>
      <strong>
        Total:{' '}
        {props.todaysFoods.reduce((acc, currentElement) => {
          return acc + currentElement.calories * currentElement.quantity;
        }, 0)}{' '}
        cal
      </strong>
    </>
  );
}

export default TodaysFoods;
