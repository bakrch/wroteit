/* global window */

import ReactDOM from 'react-dom';
import App from './app.jsx';

const Page = {
    blastoff: function () {

        this.mainElement = ReactDOM.render(
            App,
            window.document.getElementById('app-mount')
        );
    }
};
export default Page;


/* $lab:coverage:off$ */
if (!module.parent) {
    window.page = Page;
    Page.blastoff();
}
/* $lab:coverage:on$ */
