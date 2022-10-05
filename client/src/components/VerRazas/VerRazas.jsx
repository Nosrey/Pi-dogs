import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBreeds, getBreedsByFilter, getBreedsByTemps } from '../../actions/index'
import Raza from "./Raza/Raza";
import './VerRazas.css'

function VerRazas({ breeds, breeds_filtereds, getBreeds, getBreedsByFilter, getBreedsByTemps }) {
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [order, setOrder] = useState(false);
  const [weight, setWeight] = useState(false);
  const [filter, setFilter] = useState('');
  const [dogs, setDogs] = useState([]);
  const [pagina, setPagina] = useState(0);

  // estado para que los switches esten opuestos siempre
  useEffect(() => {
    setCheck2(!check1)
  }, [check1])

  useEffect(() => {
    setCheck1(!check2)
  }, [check2])

  // para traer las razas al acceder al componente
  useEffect(() => {
    if (!breeds.length) {
      getBreeds();
      setDogs(breeds)
    }
    return () => {
      console.log("unmounted");
    };
  }, []);

  useEffect(() => {
    if (filter !== '') setDogs(breeds_filtereds)
    else setDogs(breeds)
  }, [breeds_filtereds, breeds])

  // para revisar si quieres filtrar algo
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleSearchButton() {
    if (check1) getBreedsByTemps(filter)
    else getBreedsByFilter(filter);

    setDogs(breeds_filtereds);
    console.log(filter);
  }

  // activar ordenamiento
  function handleOrderChange() {
    setOrder(!order)
    setWeight(false)
    if (!order) {
      dogs.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (b.name < a.name) {
            return 1;
        }
        return 0;
      })
    } else {
      dogs.sort(function (a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (b.name > a.name) {
            return 1;
        }
        return 0;
      })
    }
  }

  function handleWeightChange() {
    setWeight(!weight)
    setOrder(false)
    if (!weight) {
      dogs.sort(function (a, b) {
        if (a.weight.metric.split(' - ')[0] < b.weight.metric.split(' - ')[0]) {
            return -1;
        }
        if (b.weight.metric.split(' - ')[0] < a.weight.metric.split(' - ')[0]) {
            return 1;
        }
        return 0;
      })
    } else {
      dogs.sort(function (a, b) {
        if (a.weight.metric.split(' - ')[0] > b.weight.metric.split(' - ')[0]) {
            return -1;
        }
        if (b.weight.metric.split(' - ')[0] > a.weight.metric.split(' - ')[0]) {
            return 1;
        }
        return 0;
      })
    }
  }

  function handlePaginaChange(n) {
    if (pagina + n < 0) {
      setPagina(0)
    } else if (pagina + n >= dogs.length -1) {
      setPagina(dogs.length-8)
    } else {
      setPagina(pagina + n)
    }
  }


  return (
    <div>
      <label className="switch">
        <h3>Ordenar por Raza desc/asc</h3>
        <input type="checkbox" onChange={handleOrderChange} checked={order} />
        <span className="slider round"></span>
      </label>
      <label className="switch">
      <h3>Order por Peso desc/asc</h3>
        <input type="checkbox" onChange={handleWeightChange} checked={weight} />
        <span className="slider round"></span>
      </label>

      <button onClick={() => setDogs(breeds)}>Cancelar</button>
      <button onClick={() => { handleSearchButton() }}>Buscar</button>
      <form>
        <label>{check1 ? 'Buscar temperamentos' : 'Buscar Razas'}</label>
        <input type="text" value={filter} onChange={handleFilterChange} />
      </form>

      <label className="switch">
        <input type="checkbox" onChange={() => setCheck1(check1 ? false : true)} checked={check1} />
        <span className="slider round"></span>
      </label>

      <label className="switch">
        <input type="checkbox" onChange={() => setCheck2(check2 ? false : true)} checked={check2} />
        <span className="slider round"></span>
      </label>


      <button onClick={() => handlePaginaChange(8)}>Next</button>
      <button onClick={() => handlePaginaChange(-8)}>Prev</button>

      {dogs.slice(pagina, pagina + 8).map(el => {
        return <Raza key={el.id} id={el.id} name={el.name} origin={el.origin} image={el.image} temperament={el.temperament} weight={el.weight} />
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    breeds: state.breeds,
    breeds_filtereds: state.breeds_filtereds
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getBreeds: () => dispatch(getBreeds()),
    getBreedsByFilter: (data) => dispatch(getBreedsByFilter(data)),
    getBreedsByTemps: (data) => dispatch(getBreedsByTemps(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerRazas);