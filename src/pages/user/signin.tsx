import React, { ChangeEvent, FormEvent, ReactElement, useEffect, useState } from 'react'
import StatusAlert from '../../components/StatusAlert';
import { StatusErrors } from '../../types';
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";
import style from '../../components/SignIn.module.scss';
import Button from '../../components/Button';
import useUsersContext from '../../hooks/use-users-context';

const SignIn: NextPageWithLayout = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLangCode] = useState("");
  const [farewell, setFarewell] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const { user, signIn } = useUsersContext();

  // const [signIn, results] = useSignInMutation();
  // const [signOut, resultsSO] = useSignOutMutation();
  //const dispatch = useAppDispatch();

  const onHandleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage([]);
  };

  const onHandleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessage: string[] = [];
    if (name === '') {
      errorMessage.push('Please enter name!');
    }
    if (password === '') {
      errorMessage.push('Please enter a password!');
    }

    try {
      await signIn({ email: name, password });
      setName("");
      setPassword("");
    } catch (error) {
      const statusErrors = error as Partial<StatusErrors>;
      setErrors(<StatusAlert statusErrors={statusErrors} />);

    }

    setErrorMessage(errorMessage);
    if (errorMessage.length === 0) {
      //dispatch(ipApi.util.invalidateTags(['CurrentUser']));
      //dispatch(setContents([name]));
      setIsValidForm(true);

    }
  };

  // const onHandleLogout = async () => {
  //   await signOut();
  //   if (isValidForm) {
  //     //setFarewell(sayFarewell(name));
  //     setIsValidForm(false);
  //   }
  //   setName('');
  //   setPassword('');
  //   setLangCode('');
  //   setErrorMessage([]);

  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setFarewell('')
    }, 5000)
    return () => clearInterval(interval)
  }, [isValidForm])

  return (
    <div>
      <section className={`${style.section}`}>
        <form className="uk-form-horizontal uk-margin-large" onReset={onHandleReset} onSubmit={onHandleLogin}>
          {errorMessage.length > 0 && (
            <div className={style.alert}>
              <ul>
                {errorMessage.map((err, i) => {
                  return (<li key={i}>{err}</li>);
                })}
              </ul>
            </div>)}
          {/* {results.isError && errors} */}
          <div className="uk-margin">
            <label className="uk-form-label">Name</label>
            <div className="uk-form-controls">
              <input value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                className={`uk-input ${name === '' && errorMessage.length && 'uk-alert-danger'}`} type="text" placeholder="e.g Alex Smith" />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Password</label>
            <div className="uk-form-controls">
              <input value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                className={`uk-input ${password === '' && errorMessage.length && 'uk-alert-danger'}`} type="password" placeholder="password" />
            </div>
          </div>

          <div className='uk-margin'>
            <div className="uk-grid-medium uk-flex-middle uk-grid" uk-grid="true">
              <div className="uk-width-auto">
                <Button primary rounded type="submit">Login</Button>
              </div>
              <div className="uk-width-expand">
                <Button secondary rounded type="reset">Reset</Button>
              </div>
            </div>
          </div>

          <div className='block'>
            {farewell}
          </div>
        </form>
      </section>
    </div>
  )
}


SignIn.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};


export default SignIn;

