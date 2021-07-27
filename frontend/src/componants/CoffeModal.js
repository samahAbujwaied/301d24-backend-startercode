import React, { Component } from 'react'
import {Form, Button, Modal } from 'react-bootstrap'
export class CoffeModal extends Component {
    render() {

        return (
            <>
                <Modal show={this.props.showModel} onHide={this.props.onclose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Update Image Path</Form.Label>
                            <Form.Control onChange={this.props.updateImgpath} value={this.props.imgpath} type="text" placeholder="Update Image Path" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Update Title </Form.Label>
                            <Form.Control onChange={this.props.updatetitle} value={this.props.title} type="text" placeholder="Update Title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Update Description</Form.Label>
                            <Form.Control onChange={this.props.updatedesc} value={this.props.description} type="text" placeholder="Update Description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Update Ingredient</Form.Label>
                            <Form.Control onChange={this.props.udateingrep} value={this.props.ingredients} type="text" placeholder="Update Ingredient" />
                        </Form.Group>
                        <Button onClick={(e)=>this.props.updateData(e)} variant="primary">Update</Button>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default CoffeModal
