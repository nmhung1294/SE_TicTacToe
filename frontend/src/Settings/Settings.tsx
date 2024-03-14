import "./Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Components/Sidebar";
import Signout from "../Components/Signout";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";

const Settings = () => {
    const [audio, setAudio] = useState(false);
    const [eloLimit, setEloLimit] = useState(false);
    return (
        <div className="settingpage">
            <Sidebar />
            <Signout />
            <div className="main-content-setting">
                <Form>
                    <FormGroup switch className="switch-type">
                        <Label check>Audio</Label>
                        <Input type="switch" checked={audio} onClick={() => {setAudio(!audio);}}></Input>
                    </FormGroup>
                    <FormGroup switch className="switch-type">
                        <Label check>Find opponent with elo in a proper range</Label>
                        <Input type="switch" checked={eloLimit} onClick={() => {setEloLimit(!eloLimit);}}></Input>
                    </FormGroup>
                </Form>
                
            </div>
        </div>
    );
};

export default Settings;