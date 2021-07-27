import React, { Component } from 'react'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'
import CoffeModal from './CoffeModal'
export class FavCom extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            coffeeData: {},
            show: false,
            server:  'http://localhost:3456',
            index:'',
         imgpath:'',
         title:'',
         ingredients:'',
         description:'',
         showModel : false
        }
    }
    componentDidMount = async () => {
        const getCoffeUrl = `${this.state.server}/fav-list`;
        const getDataAxiox = await axios.get(getCoffeUrl);
        this.setState({
            coffeeData: getDataAxiox.data,
            show: true
        })
    }
    deleteFromDataBase=async(idx,e)=>{
        e.preventDefault();
       const deleteCoffeUrl = `${this.state.server}/delete/${this.state.coffeeData[idx]._id}`;
       const deleteDataAxiox = await axios.delete(deleteCoffeUrl );
   
       this.setState({
           coffeeData: deleteDataAxiox.data,
          
       })
    }
    updateFromDataBase=(idx,e)=>{
     this.setState({
         index:idx,
         imgpath:this.state.coffeeData[idx].img,
         title:this.state.coffeeData[idx].title,
         ingredients:this.state.coffeeData[idx].ingredients,
         description:this.state.coffeeData[idx].description,
         showModel : true

     })
    }
    onClose = ()=>{
        this.setState({
            showModel : false
        })
    }
    updateImgpath =(e)=>{
        this.setState({
            imgpath:e.target.value
        })
    }
    updatetitle =(e)=>{
        this.setState({
            title:e.target.value
        })
    }
    updatedesc =(e)=>{
        this.setState({
            description:e.target.value
        })
    }
    updateingre =(e)=>{
        this.setState({
            ingredients:e.target.value
        })
    }
    updateData=async(e)=>{
        e.preventDefault();
        const updateBody ={
            title:this.state.title,
            description:this.state.description,
            ingredients:this.state.ingredients,
            image_url:this.state.imgpath,
        }
        const updateCoffeUrl = `${this.state.server}/update/${this.state.coffeeData[this.state.index]._id}`;
       const updateDataAxiox = await axios.put(updateCoffeUrl,updateBody);
   
       this.setState({
           coffeeData: updateDataAxiox.data,
          
       })
    }
    render() {
        console.log(this.state.imgpath);
        console.log(this.state.title);
        console.log(this.state.description);
        console.log(this.state.ingredients);
        return (
            <>
                {this.state.show && this.state.coffeeData.map((item,idx) => {
                    return (
                        <>
                            <Card style={{ width: '18rem' , margin:'15px', 
                            display:'inline-block' , border:'.5 solid' , backgroungColor: 'black'  , height: '15vw'
                          }}>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body >
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                       {item.ingredients}
                                        </Card.Text>
                                        <Card.Text style={{backgroungColor:"red"}}>
                                       {item.description}
                                        </Card.Text>
                                        
                                    <Button onClick={(e)=>this.deleteFromDataBase(idx,e)} variant="danger">Delete</Button>
                                    <Button onClick={(e)=>this.updateFromDataBase(idx,e)} variant="primary">Update</Button>

                                </Card.Body>
                            </Card>
                        </>
                        
                    )
                })}

                
                <CoffeModal
                showModel={this.state.showModel}
                onclose={this.onClose}
                imgpath={this.state.imgpath}
                title={this.state.title}
                ingredients={this.state.ingredients}
                description={this.state.description}
                updateImgpath ={this.updateImgpath }
                updatetitle ={this.updatetitle  }
                updatedesc ={this.updatedesc }
                updateingre ={this.updateingre }
                updateData={this.updateData}
                />
                
            </>
        )
    }
}

export default FavCom
