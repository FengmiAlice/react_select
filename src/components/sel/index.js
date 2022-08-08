import React, {useState, useEffect, useRef, Fragment} from 'react';
import PropTypes from 'prop-types';
import './style.css';


/**
 * 使用：<SelectMultip data={list} width="500px" max={3} onClick={(val) => {}}/>
 * @param {*} data [{key: 3, value: '姓名'}]
 * @param {*} width 长度
 * @param {*} onClick 
 * @param {*} max 最多展示tag数量，多的用+n标识
 */
const SelectMultip = ({data, width, onClick, max}) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(data);
  const [checkedArr,setCheckedArr] = useState([]);


  const ulRef = useRef();
  const selectRef = useRef();
  const checkedRef = useRef();
  const [initFlag,setInitFlag] = useState(false);//初始渲染标识
  const handleOpen = () => {
    setOpen(!open);
  }
        
  // 给父组件
  // const getChecked = (arr) => {
  //   setCheckedArr(arr)
  // };

  // input checkbox选中事件
  function inputCheck(e,item,i){
    console.log(e.target.checked)
    item['checked'] = e.target.checked;
      // 判断item是否选中，如果选中调用checked方法
      if(e.target.checked === true){
        handleCheck(item,i)
      }else{
          // 如果没选中，调用close方法
        handleClose(item,i)
      }
       // 在输入框内显示选中的选项
       renderMax();
  }
 
  // 选中复选框放入到选中数组checkedArr里
  const handleCheck = (item,i) => {
    let newArr=[];
    newArr = newArr.concat(checkedArr)
    newArr.push(item);
    setCheckedArr(newArr);
    console.log(checkedArr)
   
  };

  //根据item中的key,删除选中的选项
  const handleClose = (key) => {
      // 删除选中的选项，更新选中数组checkedArr
      let newArr=[];
      checkedArr.forEach((item,i)=>{
          if(item.key !== key.key){
              newArr.push(item)
          }
      })
      setCheckedArr(newArr);
      // 删除选项之后显示全部列表数组
      let newList=[...list];
      newList.forEach((k,i)=>{
        if(k.key === key.key){
          k["checked"]=false
        }
      })
      setList(newList);
    
  };

  useEffect(() => {
    if(!initFlag){
      // console.log("初始渲染111")
      setInitFlag(true)
    
    }else{
      // console.log("不是初始渲染")
    }
  }, []);


  // 动态渲染节点部分
  const renderItem = (item) => {
    console.log(item) 
      return <span className="tag"  key={item.key} title={item.value}>
      <span>{item.value}</span>
      <i onClick={()=>handleClose(item)} className="tag-close"></i>
      </span>
   };

  

   // 在输入框内显示选中的选项
  const renderMax = () => {
    let arr = checkedArr;
    console.log(arr);     
    const isUpperLimit = arr.length > max;
    console.log(isUpperLimit)
  
    // 取出多出限制的选项放进一个数组
    var limitArr=[];
    if(isUpperLimit === true){
      arr.forEach((item,i)=>{
        if(i >= max){
          limitArr.push(item)
        }
      })
    }
    
    console.log(limitArr)
    return <Fragment>{ arr.map( (item,i) => renderItem(item,i))}{isUpperLimit === true && limitArr.length>0 && <span className="tag"><span >+{limitArr.length}</span></span>} </Fragment>;
  
  };

  return (
    <div className="mutliDropdown" style={{width: width || '250px'}}>
      <div className="select" ref={selectRef} onClick={handleOpen} >
        {renderMax()}
        <i className={`select-right ${open===true ? 'select-up' : 'select-down'}`} ></i>
      </div>

      <div className="mutliSelect">
        <ul ref={ulRef} style={{display: open ? 'block' : 'none'}} >
          {
            list.map((item, i) => (
              <li key={item.key}>
                <input  ref={checkedRef} type="checkbox"  onChange={(e)=>inputCheck(e,item,i)} checked={item.checked}    />
                <label title={item.key}>{item.value}</label>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

SelectMultip.propTypes = {
  width: PropTypes.string,
  onClick: PropTypes.func,
  max: PropTypes.number,
  data(props, propName, componentName) {
    const data = props[propName];
    if (!(data && (Array.isArray(data) || typeof data == 'object'))) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected \`array\` or \`object\`. `
      );
    }
  }
};

export default SelectMultip;
