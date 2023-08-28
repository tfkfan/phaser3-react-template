import React from 'react';
import {Button, Card} from 'reactstrap';
import {useAppDispatch} from "../../hooks";
import {login} from "../../store/user.store";
import {Form, Input} from "@availity/form";

export const Login = () => {
    const dispatch = useAppDispatch()

    const onStart = (values) => {
        dispatch(login(values.name));
    };
    return (
        <div style={{background: "black"}} className="center-extended">
            <div className="fade-in">
                <Card className="game-form">
                    <Form onSubmit={onStart} initialValues={{name: "user name"}}>
                        <Input type="text" placeholder="Input your nickname" name='name'/>
                        <Button type="submit" color="success">Start game!</Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default Login;
