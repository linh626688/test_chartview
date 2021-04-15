import React, {useState} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {callApi, METHODS} from "../../../utils/requestUtils";
import {API_ROUTES} from "../../../apiRoute";
import {ACCESS_TOKEN, ERROR_CODES} from "../../../constants/constants";
import {showError, showSuccess} from "../../../utils/toast-utils";
import {isEmpty} from 'lodash';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleChangeInput = e => {
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'password') {
      setPassword(value)
    }
  };

  const handleSubmitLogin = () => {
    const payload = {
      email,
      password
    };
    callApi(API_ROUTES.LOGIN, METHODS.POST, payload)
      .then(response => {
          if (response.data.success) {
            const {accessToken} = response.data.data;
            window.localStorage.setItem(ACCESS_TOKEN, accessToken);
            showSuccess("Đăng nhập thành công");
            props.history.push('/');
          } else {
            const {errors} = response.data.data;
            if (!isEmpty(errors)) {
              const {errorCode} = errors.shift()
              const {errorMessage}= ERROR_CODES.filter((value) => value.errorCode === errorCode).shift()
              showError(errorMessage)
            }
          }
        }
      )
      .catch(error => {
        showError(error);
        console.log('error', error);
      });
  };

  return (
    <div>
      <div className="app flex-row align-items-center overlay">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Đặng Nhập</h1>
                    <p className="text-muted">Đăng nhập vào tài khoản của bạn</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Tài khoản"
                             value={email}
                             onChange={e => handleChangeInput(e)}
                             name='email'
                             autoComplete="email"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             placeholder="Mật khẩu"
                             value={password}
                             onChange={e => handleChangeInput(e)}
                             name='password'
                             autoComplete="current-password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={handleSubmitLogin}>Login</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
