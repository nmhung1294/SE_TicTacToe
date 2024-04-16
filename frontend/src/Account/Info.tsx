import { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import Cookies from "js-cookie";
import axios from "axios";

let token = Cookies.get("token");
let player = {
    username: "dfsda",
    email: "adfasd",
    elo: 34,
    totalGame: 0,
    win: 0,
};
await axios
    .get("http://localhost:8000/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        console.log(res.data);
        player.email = res.data.data.email;
        player.username = res.data.data.username;
        player.elo = res.data.data.elo;
        player.totalGame = res.data.data.number_of_games;
        player.win = res.data.data.win;
    })
    .catch((err) => {
        console.log(err);
    });

function Info() {
    return (
        <Form>
            <FormGroup row>
                <Label sm={2}>Username</Label>
                <Col sm={10}>
                    <Input
                        disabled
                        name="email"
                        type="text"
                        placeholder={player.username}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Email</Label>
                <Col sm={10}>
                    <Input
                        disabled
                        name="email"
                        placeholder={player.email}
                        type="text"
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Elo</Label>
                <Col sm={10}>{player.elo}</Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Total game</Label>
                <Col sm={10}>{player.totalGame}</Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={2}>Win</Label>
                <Col sm={10}>{player.win}</Col>
            </FormGroup>
        </Form>
    );
}

export default Info;
