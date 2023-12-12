// import React from 'react';
// import { Container,Row,Col } from 'react-bootstrap';


// function FormContainer({children}) {
//   return (
//     <Container>
//         <Row className='justify-content-md-center mt-5'>
//             <Col xs={12} md={6} className='card p-5'>
//                 {children}
//             </Col>
//         </Row>
//     </Container>
//   )
// }

// export default FormContainer
import React from 'react';

function FormContainer({ children }) {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormContainer;