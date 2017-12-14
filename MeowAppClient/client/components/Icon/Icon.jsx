import React from 'react';

export default class Icon extends React.Component {
    generateIcon() {
        var random = Math.floor((Math.random() * 6));
        switch (random % 4) {
            case 0:
                return "cat";
            case 1:
                return "fox";
            case 2:
                return "lion";
            case 3:
                return "tiger";
        }
    }

    render() {
        return (
            <img type="image" src={require("../../assets/images/"+ this.generateIcon() +".png")} value="" />
        );
    }
}