import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './CreateBreed.css';
import { getTemperaments, getBreeds } from '../../../actions/index'
import { Link } from 'react-router-dom';

let initial = false
function CreaRaza({ getTemperaments, temperaments, getBreeds }) {

  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = 'Name is required';
    } else if (input.name.length <= 1) {
      errors.name = 'Name is invalid'
    }

    if (!input.height1 || !input.height2) {
      errors.height = 'Height is required';
    } else if (!/^([0-9])*$/.test(input.height1) || !/^([0-9])*$/.test(input.height2)) {
      errors.height = 'Height is invalid';
    }

    if (!input.weight1 || !input.weight2) {
      errors.weight = 'Weight is required';
    } else if (!/^([0-9])*$/.test(input.weight1) || !/^([0-9])*$/.test(input.weight2)) {
      errors.weight = 'Weight is invalid';
    }

    if (!input.life1 || !input.life2) {
      errors.life = 'Life span is required';
    } else if (!/^([0-9])*$/.test(input.life1) || !/^([0-9])*$/.test(input.life2)) {
      errors.life = 'Life span is invalid';
    }

    if (!input.temperaments.length) {
      errors.temperaments = 'Temperaments are required';
    }

    if (!input.image) {
      errors.image = 'URL is required'
    } else if (!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(input.image)) { errors.image = 'URL is not valid' }

    return errors;
  };

  const [input, setInput] = useState({
    name: '',

    height1: '',
    height2: '',
    height: '',

    weight1: '',
    weight2: '',
    weight: '',

    life1: '',
    life2: '',
    life: '',

    tempSearch: '',
    temps: [],
    temperaments: [],

    image: '',
  })
  const [errors, setErrors] = useState({ image: 'URL is required' });

  useEffect(() => {
    if (!temperaments.length) {
      getTemperaments();
    }
    return () => {
      console.log("unmounted");
    };
  }, []);

  useEffect(() => {
    if (initial) { setErrors(validate(input)); }
  }, [input])

  useEffect(() => {
    setInput({ ...input, height: input.height1 + ' - ' + input.height2 })
  }, [input.height1, input.height2])

  useEffect(() => {
    setInput({ ...input, weight: input.weight1 + ' - ' + input.weight2 })
  }, [input.weight1, input.weight2])

  useEffect(() => {
    setInput({ ...input, life: input.life1 + ' - ' + input.life2 + ' years' })
  }, [input.life1, input.life2])

  const handleInputChange = (e) => {
    initial = true;
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }



  const handleTempChange = (e) => {
    let tempoInput = {
      ...input,
      tempSearch: e.target.value
    }

    if (temperaments.length) {
      tempoInput = {
        ...tempoInput,
        temps: []
      }
      for (let i = 0; i < temperaments.length; i++) {
        if (temperaments[i].toLowerCase().includes(tempoInput.tempSearch.toLowerCase()) && tempoInput.tempSearch.length) {
          tempoInput = {
            ...tempoInput,
            temps: [...tempoInput.temps, temperaments[i]]
          }
        }
      }
    }
    setInput(tempoInput)
  }

  const handleTempSubmit = (e) => {
    e.preventDefault();
    let arrayTemp = [...input.temperaments, input.temps[0]]
    setInput({
      ...input,
      temperaments: [...new Set(arrayTemp)]
    })
  }

  const enviar = (e) => {
    e.preventDefault()

    fetch('http://localhost:3001/dogs', {
      method: 'POST',
      body: JSON.stringify({...input, temperaments: input.temperaments.map(el => el = temperaments.indexOf(el))}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) { console.log(data) })
      .then(() => getBreeds())
  }

  // body: { "nombre_raza": "hola", "altura_raza": "1", "peso_raza": "2", "años_de_vida_raza": "5", "nombre_temp": [1, 2, 4] }
  return (
    <form onSubmit={enviar}>
      <Link to='/main'><button>Regresar</button></Link>
      <div>
        <label>Name: </label>
        <input className={errors.name ? 'danger' : null} type="text" name="name" onChange={handleInputChange} value={input.name} placeholder="Enter the name of the Breed"></input>
        <p>{errors.name}</p>
      </div>

      <div>
        <label>Height promedy (in metrics): </label>
        <input className={errors.height ? 'danger' : null} size='1' type="text" name="height1" onChange={handleInputChange} value={input.height1} placeholder="num..."></input>
        <label> - </label>
        <input className={errors.height ? 'danger' : null} size='1' type="text" name="height2" onChange={handleInputChange} value={input.height2} placeholder="num..."></input>
        <p>{errors.height}</p>
      </div>

      <div>
        <label>Weight promedy (in metrics): </label>
        <input className={errors.weight ? 'danger' : null} size='1' type="text" name="weight1" onChange={handleInputChange} value={input.weight1} placeholder="num..."></input>
        <label> - </label>
        <input className={errors.weight ? 'danger' : null} size='1' type="text" name="weight2" onChange={handleInputChange} value={input.weight2} placeholder="num..."></input>
        <p>{errors.weight}</p>
      </div>

      <div>
        <label>Life span promedy (in years): </label>
        <input className={errors.life ? 'danger' : null} size='1' type="text" name="life1" onChange={handleInputChange} value={input.life1} placeholder="num..."></input>
        <label> - </label>
        <input className={errors.life ? 'danger' : null} size='1' type="text" name="life2" onChange={handleInputChange} value={input.life2} placeholder="num..."></input>
        <p>{errors.life}</p>
      </div>

      <div>
        <div>
          <label>Temperament seeker: </label>
          <input className={errors.temperaments ? 'danger' :
            null} type='text' name='tempSearch' onChange={handleTempChange} value={input.tempSearch} placeholder="Search for temperaments..." />
          <p>{input.temps.length ? 'You mean...? ' + input.temps[0] : 'no matches'}</p>
          <button onClick={handleTempSubmit}>add temper</button>
        </div>

        <div>
          <label>Temperaments: {input.temperaments?.map(el => el + ' ')}</label>
        </div>
      </div>

      <div>
        <label>Image: </label>
        <input className={errors.image ? 'danger' : null} type='text' name='image' onChange={handleInputChange} value={input.image} placeholder='URL for the image' />
        <p>{errors.image}</p>
        <img className={errors.image ? 'invisible' : null} src={input.image} alt=' dog image' />
      </div>


      <input type="submit" value="Listo" />
    </form>
  )
}


const mapStateToProps = (state) => {
  return {
    temperaments: state.temperaments,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getBreeds: () => dispatch(getBreeds()),
    getTemperaments: () => dispatch(getTemperaments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreaRaza);