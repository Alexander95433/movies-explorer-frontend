import { useHistory } from 'react-router-dom';

function NotFoundPage() {
    const handleGoBack = () => {
        history.goBack();
      };
    const history = useHistory();
    return (
        <section className="not-found-page__background">
            <div className='not-found-page__wrapper'>
                <h2 className='not-found-page__title'>404</h2>
                <p className='not-found-page__subtitle'>Страница не найдена</p>
                <p className='not-found-page__link' type='button' onClick={handleGoBack}>Назад</p>
            </div>
        </section>
    );
};

export default NotFoundPage;