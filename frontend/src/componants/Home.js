import React, { Component } from 'react'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coffeeData: {},
            show: false,
            server: process.env.REACT_APP_SERVER || 'http://localhost:3456',
        }
    }
    componentDidMount = async () => {
        const getCoffeUrl = `${this.state.server}/retreive`;
        const getDataAxiox = await axios.get(getCoffeUrl);
        this.setState({
            coffeeData: getDataAxiox.data,
            show: true
        })
    }
    addToFav=async (item,e)=>{
        e.preventDefault();
        const addBody = {
            image_url:item.image_url,
            title:item.title,
            ingredients:item.ingredients,
            description:item.description

        }
       const postCoffeUrl = `${this.state.server}/create`
       await axios.post(postCoffeUrl,addBody)
       console.log(item);
       console.log(addBody);
    }
    render() {
        return (
            <>
                {this.state.show && this.state.coffeeData.map((item,idx) => {
                    return (
                        <>
                            <Card style={{ width: '18rem' , margin:'15px', 
                            display:'inline-block' , border:'.5 solid' , backgroungColor: 'black'  , height: '35vw'
                          }}>
                                <Card.Img variant="top" src={item.image_url} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                       {item.ingredients}
                                        </Card.Text>
                                        <Card.Text>
                                       {item.description}
                                        </Card.Text>
                                        
                                    <Button onClick={(e)=>this.addToFav(item,e)} variant="primary">Add To Favorite</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}
            </>
        )
    }
}

export default Home
