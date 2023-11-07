import {mail} from "../utils/constants"


export default function AboutPage() {
	return (
		<div className="m-t-30 m-b-40" style={{maxWidth: "900px"}}>
			<h5><b>About Mylists.info</b></h5>
			<p className="text-justify">
				I'am only 1 (french) person maintaining this website. It is just a project on my free time to know where
				I'am on TV shows, movies, games or books for me and my friends. If you have any constructive remarks,
				find any bugs or want to be involved in the evolution of Mylists.info, please do not hesitate and&nbsp;
				<a className="text-light" href={"mailto:" + mail}>contact me</a>.
			</p>

			<h5 className="m-t-30"><b>About Flask</b></h5>
			<p className="text-justify">
				MyLists.info is powered server side by Flask from:&nbsp;
				<a href="https://palletsprojects.com/">palletsprojects.com</a>. The license of Flask can be found&nbsp;
				<a href="https://flask.palletsprojects.com/en/latest/license/">here</a>.
			</p>

			<h5 className="m-t-30"><b>About React</b></h5>
			<p className="text-justify">
				MyLists.info is powered front side by React from:&nbsp;
				<a href="https://react.dev/">react.dev</a>. The license of react can be found&nbsp;
				<a href="https://github.com/facebook/react/blob/main/LICENSE">here</a>.
			</p>

			<h5 className="m-t-30"><b>About MDB</b></h5>
			<p className="text-justify">
				MyLists.info uses <a href="https://mdbootstrap.com/">Material Design for Bootstrap</a>.
				The license of MDB can be found <a href="https://mdbootstrap.com/general/license/">here</a>.
			</p>

			<h5 className="m-t-30"><b>About TMDB API</b></h5>
			<p className="text-justify">
				MyLists.info uses the <a href="https://www.themoviedb.org/">TMDB</a> API but is not endorsed
				or certified by TMDB.
				Here is the link to the <a href="https://www.themoviedb.org/documentation/api">TMDb API</a>.
			</p>

			<h5 className="m-t-30"><b>About IGDB API</b></h5>
			<p className="text-justify">
				MyLists.info uses the <a href="https://www.igdb.com/">IGDB</a> API but is not endorsed or certified
				by IGDB. Here is the link to the <a href="https://api-docs.igdb.com/">IGDB API</a>.
			</p>

			<h5 className="m-t-30"><b>About Google Books API</b></h5>
			<p className="text-justify">
				MyLists.info uses the <a href="https://books.google.com/">Google Books</a> API but is not endorsed or
				certified by Google.
				Here is the link to the <a href="https://developers.google.com/books/">Google Books API</a>.
			</p>
		</div>
	)
};

