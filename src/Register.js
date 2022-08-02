import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Col, Row} from "antd";
import './Register.css';

//user can have lower/upper/number/ - or _
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//pwd requires at least 1 lower, 1 uppercase, 1 num, 1 special char
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    //for username
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    //for password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    //for error msg
    useEffect(() => {
        setErrMsg('');
    }, [user,pwd,validMatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with JS hack (prevent hackers)
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
    }

    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p><a href="#">Sign In</a></p>
            </section>
        ) : (
            <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 style={{color: '#333'}}>Register</h1>
            <form onSubmit={handleSubmit}>
                <Row style={{padding: 10}}>
                    <Col span={6}>
                    <label htmlFor="username">
                    Username: 
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>

                    </label>
                    </Col>
                    <Col span={6}>
                    <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)}
                    required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" 
                    onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} 
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters<br />
                    Must begin with a letter<br />
                    Letters, numbers, underscores, hyphens allowed
                </p>
                    </Col>

                </Row>
   
                <Row style={{padding: 10}}>
                    <Col span={6}>
                    <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                    </Col>
                    <Col span={6}>
                    <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} required
                    aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters<br />
                    Must include uppercase and lowercase letters, a number and a special character<br />
                </p>

                    </Col>
                </Row>
              
                <Row style={{padding: 10}}>
                    <Col span={6}>
                    <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                    </Col>
                    <Col span={6}>
                    <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} required
                    aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />

                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the first password input field
                </p>
                    </Col>
                </Row>
          
                <Row style={{padding: 10}}>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </button>
                </Row>

            </form>

            <p style={{color: '#333'}}>
                Already registered?<br />
                <span className="line">
                    {/*put router link here */}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
        )}
        
        </>
    )

}

export default Register;