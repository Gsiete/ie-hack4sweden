import React from "react";

type Props = {
    image: string,
    title: string
    link?: string
}

const Icon = (props: Props) => {

    const image = <div className="icon">
        <img className="icon-image" alt={props.title} src={`${process.env.PUBLIC_URL}/${props.image}`} />
        <p className="text-muted">{props.title}</p>
    </div>


    if (props.link) {
        return <a href={props.link}>{image}</a>
    }
    return image
}

export default Icon;