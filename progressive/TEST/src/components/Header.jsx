function Header({ title, subtitle }) {
    return (
        <header>
            <h1 className="title">{title}</h1>
            {subtitle && (<p>{subtitle}</p>)}
        </header>
    )
}

export default Header;