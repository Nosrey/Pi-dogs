import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './CreateBreed.css';
import '../Main/Main.css'
import { getTemperaments, getBreeds } from '../../actions/index'
import { Link } from 'react-router-dom';


function CreaRaza({ getTemperaments, temperaments, getBreeds, breeds }) {
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
    }
    //eslint-disable-next-line
    else if (!/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(input.image)) { errors.image = 'URL is not valid' }

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
    sending: false,
  })
  const [errors, setErrors] = useState({ image: 'URL is required' });

  useEffect(() => {
    if (!temperaments.length) {
      getTemperaments();
      getBreeds()
    }
    return () => {
      console.log("unmounted");
    };
  }, []); //eslint-disable-line

  useEffect(() => {
    setErrors(validate(input));
  }, [input])

  useEffect(() => {
    setInput({ ...input, height: input.height1 + ' - ' + input.height2 })
  }, [input.height1, input.height2]) //eslint-disable-line

  useEffect(() => {
    setInput({ ...input, weight: input.weight1 + ' - ' + input.weight2 })
  }, [input.weight1, input.weight2]) //eslint-disable-line

  useEffect(() => {
    setInput({ ...input, life: input.life1 + ' - ' + input.life2 + ' years' })
  }, [input.life1, input.life2]) //eslint-disable-line

  const handleInputChange = (e) => {
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
    if (input.temps[0]) {
      setInput({
        ...input,
        temperaments: [...new Set(arrayTemp)]
      })
    }
  }

  const enviar = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && breeds.length) {
      setInput({ ...input, sending: true }); //eslint-disable-line
      for (let i = 0; i < breeds.length; i++) {
        if (breeds[i].name.toLowerCase() === input.name.toLowerCase()) {
          setInput({ ...input, sending: false })
          alert('The breed you are trying to add already exists')
          return false;
        }
      }

      fetch('http://localhost:3001/dogs', {
        method: 'POST',
        body: JSON.stringify({ ...input, temperaments: input.temperaments.map(el => el = temperaments.indexOf(el)) }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) { console.log(data) })
        .then(() => alert('Published successfully!'))
        .then(() => getBreeds())
        .then(() => setInput({ ...input, sending: false })) //eslint-disable-line
    }

    else alert('Could not continue, you still have ' + Object.keys(errors).length + ' errors left')
  }

  return (
    <form onSubmit={!input.sending ? enviar : (e) => { e.preventDefault(); return false; }} className='main-createBreed'>
      <Link to='/main'><button className='home-btn back-btn'>Go back</button></Link>
      <div className='dogsForm'>

        <div className='section'>
          <label>Breed name: </label>
          <input className={errors.name ? 'danger' : 'fine'} type="text" name="name" onChange={handleInputChange} value={input.name} placeholder="Enter the name of the Breed"></input>
        </div>
        <p>{errors.name}</p>

        <div className='section'>
          <label>Height promedy (in metrics): </label>
          <div>
            <input className={errors.height ? 'danger' : 'fine'} size='1' type="text" name="height1" onChange={handleInputChange} value={input.height1} placeholder="num..."></input>
            <label> - </label>
            <input className={errors.height ? 'danger' : 'fine'} size='1' type="text" name="height2" onChange={handleInputChange} value={input.height2} placeholder="num..."></input>
          </div>
        </div>
        <p>{errors.height}</p>

        <div className='section'>
          <label>Weight promedy (in metrics): </label>
          <div>
            <input className={errors.weight ? 'danger' : 'fine'} size='1' type="text" name="weight1" onChange={handleInputChange} value={input.weight1} placeholder="num..."></input>
            <label> - </label>
            <input className={errors.weight ? 'danger' : 'fine'} size='1' type="text" name="weight2" onChange={handleInputChange} value={input.weight2} placeholder="num..."></input>
          </div>
        </div>
        <p>{errors.weight}</p>

        <div className='section'>
          <label>Life span promedy (in years): </label>
          <div>
            <input className={errors.life ? 'danger' : 'fine'} size='1' type="text" name="life1" onChange={handleInputChange} value={input.life1} placeholder="num..."></input>
            <label> - </label>
            <input className={errors.life ? 'danger' : 'fine'} size='1' type="text" name="life2" onChange={handleInputChange} value={input.life2} placeholder="num..."></input>
          </div>
        </div>
        <p>{errors.life}</p>


        <div className='section'>
          <label>Temperament seeker: </label>
          <input className={errors.temperaments ? 'danger' :
            'fine'} type='text' name='tempSearch' onChange={handleTempChange} value={input.tempSearch} placeholder="Search for temperaments..." />
        </div>

        <div className='section'>
          <p className='result'>{input.temps.length ? 'You mean...? ' + input.temps[0] : 'No matches'}</p>
          <button className='next' onClick={handleTempSubmit}>add temper</button>
        </div>

        <div className='section'>
          <label className='temps'>Temperaments: {input.temperaments?.map(el => el + ' ')}</label>
        </div>

        <div className='section'>
          <label>Image: </label>
          <input className={errors.image ? 'danger' : 'fine'} type='text' name='image' onChange={handleInputChange} value={input.image} placeholder='URL for the image' />
          <img className={errors.image ? 'invisible' : null} src={input.image} alt=' dog' />
        </div>
        <p>{errors.image}</p>


        <input className='next' type="submit" value="Send" />
        <i className={!input.sending ? 'invisible' : 'sending'}>Please wait...</i>
      </div>
    </form>
  )
}


const mapStateToProps = (state) => {
  return {
    temperaments: state.temperaments,
    breeds: state.breeds,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getBreeds: () => dispatch(getBreeds()),
    getTemperaments: () => dispatch(getTemperaments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreaRaza);