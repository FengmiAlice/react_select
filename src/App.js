import React from 'react';
import { Select } from './components';
import SelectMultip from './components/sel/index';
import data from './data';
import './App.css';

// 在每个option选项前面加个checkbox
// checkbox触发事件和onchange事件绑定，每选择一个option,选中的值就会对应增加

const customStyles = {
  option: (provided, state) => (
   
   <label style={{ marginRight: '1em' }}>
    <input type="checkbox"  />

  </label>
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
  ),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
// const Checkbox = ({ children, ...props }) => (
//   <label style={{ marginRight: '1em' }}>
//     <input type="checkbox" {...props} />
//     {children}
//   </label>
// );




function App() {
    // const [isChecked,setChecked] = useState(false)
    // const toggleChange = (isChecked)=>{
    //   console.log(isChecked)
    //   setChecked(isChecked)
    // }
const handleClick=(e)=>{
  // console.log(e)
}
  return (
    <div className="App">
      <SelectMultip data={data} width="500px" max={3} onClick={handleClick}></SelectMultip>

      <div className='section'>
        <p>Exercise 1:</p>
        <Select  style={customStyles}  isMulti={true} options={data}  >
           
        </Select>
      </div>
      <div className='section'>
        <p>Exercise 2:</p>
        <Select options={data} isMulti={true} />
      </div>
    </div>
  );
}

export default App;