/* eslint-disable */
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const VClipSearchItem = props => {
  return (


      <Card style={{ width: '18rem' ,fontFamily:'Raleway' }}>
        <Card.Img variant="top" src={props.thumbnail} alt={props.thumbnail}/>
        <Card.Body>
          <Card.Title style={{backgroundColor:'lightgrey'}}>
            <br/>
            <article>{props.author.replaceAll('<b>', '').replaceAll('</b>', '')}</article>
          </Card.Title>
          <hr/>
          <Card.Text style={{width:'280px', height:'60px' ,margin:'10px'}}>
            {props.title.replaceAll('<b>', '').replaceAll('</b>', '')}
          </Card.Text>
          <Card.Text style={{margin:'10px'}}>
          <Button variant="primary" style={{padding:'5px'}}><a href={props.url} style={{textDecoration:'none', color:'white'}}>링크 바로가기</a></Button>
          </Card.Text>
        </Card.Body>
      </Card>



    // <li>
    //   <dl>
    //     <dt>
    //       <img src={props.thumbnail} alt={props.thumbnail} />
    //     </dt>
    //     <dd>
    //       <h3>{props.title.replaceAll('<b>', '').replaceAll('</b>', '')}</h3>
    //       <article>{props.author.replaceAll('<b>', '').replaceAll('</b>', '')}</article>
    //       <a href={props.url}>링크 바로가기</a>
    //     </dd>
    //   </dl>
    // </li>
  );
};

export default VClipSearchItem;