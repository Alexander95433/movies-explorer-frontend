import { Route, Link, Switch } from 'react-router-dom';
import headerIcon from '../../../image/header-icon.png'
import accountIcon from '../../../image/movies-header-icon-account.png'

function Header() {
    return (
        <section className='header__background'>
            <img className='header__icon' src={headerIcon} />
            <Switch>
                <Route exact path={'/'}>
                    <nav className='header__authentication'>
                        <li className='header__link-box'><Link className='header__link-registration' to='#' >Регистрация</Link></li>
                        <li className='header__link-box-grin'><Link className='header__link-entrance' to='#' >Войти</Link></li>
                    </nav>
                </Route>

                <Route exact path={'/movies'}>
                    <nav className='header__movies'>
                        <li className='header__link-box-movies'> <Link className='header__link-movies'>Фильмы</Link>  </li>
                        <li className='header__link-box-movies'> <Link className='header__link-movies header__link-movies_save-film'>Сохранённые фильмы</Link>  </li>
                        <li className='header__link-box-movies'>
                            <Link className='header__link-account'>Аккаунт <div className='header__movies-icon-box'> <img className='header__movies-icon' src={accountIcon} /></div></Link>
                        </li>
                    </nav>
                </Route>
            </Switch>
        </section>
    );
};

export default Header;
