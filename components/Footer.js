export default function Footer() {
    return (
        <>
          <div className="footer-copyright">
            <div className="container center">
                Copyright © {new Date().getFullYear()} GSOnline. All Rights Reserved <br />
                Developed by <span>Agrim Singh</span>.
            </div>
          </div>

        <style jsx>
            {`
                .footer-copyright {
                    background-color: #263238;
                    color: white;
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    line-height: 25px;
                }

                span {
                    font-weight: 500;
                    color: white !important;
                }
            `}
        </style>
        </>
    )
}
