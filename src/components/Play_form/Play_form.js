import React, { useEffect, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Select from "react-select";
import "./Play_form.css"
import usePlayFormStore from '../Zustand/PlayFormStore';
import { Link, useNavigate } from 'react-router-dom';

function Play_form(props) {
  const navigate = useNavigate()
  const [update,setUpdate] = useState(false)  
  const initialFormData = {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    availableTimeSlots: [],
    sports: [],
    courts: [],
    file: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  useEffect(()=>{
    if(props.dataIndex){
        setFormData(playData[props.dataIndex])
        console.log("worked")
        setUpdate(true)
    }
    if(props.dataIndex===0){
        setFormData(playData[props.dataIndex])
        console.log("worked")
        setUpdate(true)
    }
    if(playData.length ===0 ){
        setUpdate(false)
    }
},[props.dataIndex])
  const form = [
    { name: 'name', type: 'text', value: formData.name, required: true },
    { name: 'address1', type: 'text', value: formData.address1, required: true },
    { name: 'address2', type: 'text', value: formData.address2, required: false },
    { name: 'city', type: 'text', value: formData.city, required: true },
    { name: 'state', type: 'text', value: formData.state, required: true },
    { name: 'country', type: 'text', value: formData.country, required: true },
    { name: 'zipcode', type: 'text', value: formData.zipcode, required: true },
  ];

  const playTime = [
    { value: '8:00 to 9:00', label: '8:00 to 9:00' },
    { value: '9:00 to 10:00', label: '9:00 to 10:00' },
    { value: '10:00 to 11:00', label: '10:00 to 11:00' },
    { value: '11:00 to 12:00', label: '11:00 to 12:00' },
    { value: '12:00 to 13:00', label: '12:00 to 13:00' },
    { value: '13:00 to 14:00', label: '13:00 to 14:00' },
  ];

  const sportsList = [
    { value: "cricket", label: "cricket" },
    { value: "football", label: "football" },
    { value: "Tennis", label: "Tennis" },
    { value: "vollyball", label: "vollyball" },
    { value: "golf", label: "golf" },
    { value: "badminton", label: "badminton" },
  ];

  const courtList = [
    { value: "court1", label: "court1" },
    { value: "court2", label: "court2" },
    { value: "court3", label: "court3" },
  ];
  
  const {addData,playData,editData} = usePlayFormStore(); 

  const formHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTimeChange = (selectedTimes) => {
    const timeValues = selectedTimes.map((time) => time.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableTimeSlots: selectedTimes,
    }));
  };

  const handleSport = (selectedSports) => {
    const sportValues = selectedSports.map((sport) => sport.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sports: selectedSports,
    }));
  };

  const handleCourt = (selectedCourts) => {
    const courtValues = selectedCourts.map((court) => court.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      courts: selectedCourts,
    }));
  };
  const fileHandler = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
    // setSelectedFileName(file ? file.name : ''); 
  };
  

  const playFormHandler = (event) => {
    event.preventDefault()
    console.log(formData)

    if(update){
        const updatedData = {...formData} ;
        const indexToUpdate =props.dataIndex
        editData(indexToUpdate, updatedData);
        console.log(formData)
        setFormData(initialFormData);
        setUpdate(false)
        props.removeindx(false)
        navigate("/")
    }else{
        addData(formData)
        setFormData(initialFormData);
        navigate("/")
    }
  };

  return (
    <Container>
    <div className='py-2 border-bottom'>
        <div className='d-flex justify-content-end'>
          <Link to="/"><button className='btn btn-primary'>My slots</button></Link>
        </div>
      </div>
    <div className='d-flex justify-content-center'>
      
      <form onSubmit={playFormHandler}>
        <h2 className='text-center py-3'>Book your Slot</h2>
        <div className='row'>
        {form.map((label, index) => {
          return (
            <Form.Group className='form_size col-md-6 col-12 py-2' key={index} >
              <Form.Label>{label.name}</Form.Label>
              <Form.Control
                type={label.type}
                name={label.name}
                value={formData[label.name]}
                onChange={formHandler}
                required={label.required}
              />
            </Form.Group>
          );
        })}
        </div>
       <div className='row'>
       <Form.Group className='form_size col-md-6 col-12 py-2'>
          <Form.Label>AvailableTimeSlots</Form.Label>
          <Select
            value={formData.availableTimeSlots}
            name="availableTimeSlots"
            options={playTime}
            onChange={handleTimeChange}
            isSearchable={true}
            isMulti={true}
            required
          />
        </Form.Group>
        <Form.Group className='form_size col-md-6 col-12 py-2'>
          <Form.Label>Sports</Form.Label>
          <Select
            value={formData.sports}
            name="sports"
            options={sportsList}
            onChange={(e) => handleSport(e)}
            isSearchable={true}
            isMulti={true}
            required
          />
        </Form.Group>
        <Form.Group className='form_size col-md-6 col-12 py-2'>
          <Form.Label>Court</Form.Label>
          <Select
            value={formData.courts}
            name="courts"
            options={courtList}
            onChange={(e) => handleCourt(e)}
            isSearchable={true}
            isMulti={true}
            required
          />
        </Form.Group>
        <Form.Group className='form_size col-md-6 col-12 py-2' >
            <Form.Label>File</Form.Label>
            <Form.Control
            type="file"
            name="file"
            value={formData.value}
            onChange={fileHandler}
          />
          </Form.Group>
       </div>
          {update && <button type="submit"  className='btn btn-primary my-4 py-2 mx-2'>Update</button> }
          {update && <button type="submit" onClick={()=>setUpdate(false)} className='btn btn-primary my-4 py-2'>cancel</button> }
           {!update && <button type="submit" className='btn btn-primary my-4 py-2'>Submit</button>}
      </form>
    </div>
    </Container>
  );
}

export default Play_form;
