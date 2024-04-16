import React, { useState } from "react";
import { Alert } from "reactstrap";
import "./Warning.css";

interface WarningProps {
  color: string;
  content: string;
  visible: boolean;
  setVisible: () => void;
}

function Warning({ color, content, visible, setVisible }: WarningProps) {
  return visible ? (
    <Alert color={color} toggle={setVisible} className="warning">
      {content}
    </Alert>
  ) : (
    <div></div>
  );
}

export default Warning;
