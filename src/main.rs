use std::env;

#[async_std::main]

async fn main() -> Result<(), std::io::Error> {
    femme::start();
    let path = env::current_exe()?;

    let html_path = path.join("..").join("..").join("..").join("html");

    let mut app = tide::new();
    
    app.with(tide::log::LogMiddleware::new());

    /*println!("{}", html_path.display());
	println!("{}", html_path.join("CSS\\").display());
	println!("{}", html_path.join("images\\").display());*/
	
    app.at("/").serve_file(html_path.join("index.html"))?;
	app.at("/CSS/*").serve_dir(html_path.join("CSS\\"))?;
	app.at("/images/*").serve_dir(html_path.join("images\\"))?;
	
    app.at("/test/").get(|_| async {Ok("test!")});

    app.listen("127.0.0.1:8080").await?;
    Ok(())
}