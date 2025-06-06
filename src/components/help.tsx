import { Link } from "react-router";

function Help() {

    return (
        <section className="section">

            <div className="container is-fluid">
                <h1 className="title is-uppercase">Handball Resultate und Spiele</h1>
                <ul>
                    <li>
                        <Link to="/verein/140675">Verwende /verein/140675 fuer einen ganzen Verein, z.B. 140675</Link>
                    </li>
                    <li>
                        <Link to="/team/37412">Verwende /team/37412 fuer ein einzelnes Team, z.B. 37412</Link>
                    </li>
                </ul>
            </div >
        </section>

    );
}

export default Help;