import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBreeds, getBreedsByFilter, getBreedsByTemps } from '../../actions/index'
import Cards from './Cards/Cards.jsx'

import './VerRazas.css'


function VerRazas({ breeds, breeds_filtereds, getBreeds, getBreedsByFilter, getBreedsByTemps }) {
  const [allowTemps, setAllowTemps] = useState(false);
  const [allowBreeds, setAllowBreeds] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState('');
  const [dogs, setDogs] = useState([]);
  const [page, setPage] = useState(0);

  const [states, setStates] = useState({
    breedsOrder: true,
    weightOrder: false,
  })

  // estado para que los switches esten opuestos siempre
  useEffect(() => {
    setAllowBreeds(!allowTemps)
  }, [allowTemps])

  useEffect(() => {
    setAllowTemps(!allowBreeds)
  }, [allowBreeds])

  // para traer las razas al acceder al componente
  useEffect(() => {
    if (!breeds.length) {
      getBreeds();
    }
    return () => {
      console.log("unmounted");
    };
  }, []); //eslint-disable-line

  useEffect(() => {
    if (filter !== '') setDogs(breeds_filtereds)
    else setDogs(breeds)
  }, [breeds_filtereds, breeds]) //eslint-disable-line

  useEffect(() => {
    setLoading(false)
  }, [breeds_filtereds])

  // para revisar si quieres filtrar algo
  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleSearchButton(e) {
    setPage(0);
    setLoading(true);
    e.preventDefault();
    if (allowTemps) getBreedsByTemps(filter);
    else getBreedsByFilter(filter);
    setDogs(breeds_filtereds);
  }

  // activar ordenamiento
  function handleOrderChange() {
    setStates({
      ...states,
      breedsOrder: !states.breedsOrder,
      weightOrder: false
    })
    if (!states.breedsOrder) {
      dogs.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    } else {
      dogs.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      })
    }
  }

  function handleWeightChange() {
    setStates({
      ...states,
      weightOrder: !states.weightOrder,
      breedsOrder: false,
    })
    if (!states.weightOrder) {
      dogs.sort(function (a, b) {
        if (a.weight.metric.split(' - ')[0] < b.weight.metric.split(' - ')[0]) {
          return -1;
        }
        if (a.weight.metric.split(' - ')[0] > b.weight.metric.split(' - ')[0]) {
          return 1;
        }
        return 0;
      })
    } else {
      dogs.sort(function (a, b) {
        if (a.weight.metric.split(' - ')[0] > b.weight.metric.split(' - ')[0]) {
          return -1;
        }
        if (a.weight.metric.split(' - ')[0] < b.weight.metric.split(' - ')[0]) {
          return 1;
        }
        return 0;
      })
    }
  }

  function handlePageChange(n) {
    if (page + n < 0) {
      setPage(0)
    } else if (page + n >= dogs.length - 1) {
      setPage(dogs.length - 8)
    } else {
      setPage(page + n)
    }
  }

  function handleCancelButton(e) {
    e.preventDefault();
    setLoading(false)
    setDogs(breeds);
  }

  function pagination(pag) {
    let pag1 = pag + 1
    let pag2 = pag + 8
    if (pag2 > dogs.length) pag2 = dogs.length
    if (pag1 > dogs.length - 8) pag1 = (dogs.length - 7) 
    if (pag1 < 1) pag1 = 1;
    return (pag2 === 0 ? 0 : pag1) + ' - ' + (pag2)
  }

  return (

    <div className="main-verRazas">
      <form className="breedSearcher">
        <nav>
          <i>Search by Breeds | Search by Temps</i>
          <div className="centerElements">
            <label className="switch">
              <input type="checkbox" onChange={() => setAllowBreeds(allowBreeds ? false : true)} checked={allowBreeds} />
              <span className="slider round"></span>
            </label>

            <label className="switch">
              <input type="checkbox" onChange={() => setAllowTemps(allowTemps ? false : true)} checked={allowTemps} />
              <span className="slider round"></span>
            </label>
          </div>

          <h2>{allowTemps ? 'Search Temperaments ' : 'Search Breeds '}</h2>
          <div>
            <input className='searchDogs' type="text" value={filter} placeholder='Search...' onChange={handleFilterChange} />
            <button className='sendDogs' onClick={handleSearchButton}>Search</button>
            <button className='cancelDogs' onClick={handleCancelButton}>Cancel</button>
          </div>
          <div className="centerElements">
            <button className='next' onClick={(e) => { e.preventDefault(); handlePageChange(-8) }}><b>Prev</b></button>
            <button className='next' onClick={(e) => { e.preventDefault(); handlePageChange(8) }}><b>Next</b></button>
          </div>
        </nav>
      </form>

      <Cards dogs={dogs} page={page} loading={loading} />
      <h1 className={dogs.length && !loading ? 'invisible' : 'empty-cards'}>Trying to find dogs...</h1>

      <h1 className="pager">{pagination(page)}</h1>
      <div className="orderBreeds">
        <i>&lt;- Order by Breeds -&gt; | &lt;- Order by Weight -&gt;</i>
        <div>
          <label className="switch">
            <input type="checkbox" onChange={handleOrderChange} checked={states.breedsOrder} />
            <span className="slider round"></span>
          </label>
          <label className="switch">
            <input type="checkbox" onChange={handleWeightChange} checked={states.weightOrder} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
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