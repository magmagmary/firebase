import { useEffect, useState } from "react";
import useUtility from "../../hooks/useUtility";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../plugins/firebase";
import { Link } from "react-router-dom";

type Movie = {
    title: string;
    director: string;
    id: string;
    hasOscar: string;
}

const NewMovie = () => {
    const { navigate, findQueryParams, pathName } = useUtility();
    const moviesCollectionRef = collection(db, "movies");
    const [movie, setMovie] = useState({ title: "", director: "", hasOscar: "" });
    const [id, setId] = useState("")

    useEffect(() => {
        const getMovie = async () => {
            const id = findQueryParams("id");
            const docRef = doc(db, "movies", id);
            const docSnap = await getDoc(docRef);
            if (pathName.match("edit") && !docSnap.exists) {
                navigate("/");
                return;
            }
            setId(id);
            setMovie(docSnap.data() as Movie)
        }
        getMovie();
    }, [])


    const updateMovie = async (e: any) => {
        e.preventDefault();
        try {
            const targetMovie = doc(db, "movies", id);
            await updateDoc(targetMovie, movie);
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }


    const handleChange = (e: any) => {
        setMovie((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            addDoc(moviesCollectionRef, {
                ...movie, releaseDate:
                    new Date().getFullYear()
            })
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5 w-1/3">

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-5">
                    New Movie
                </h3>
                <form className="space-y-6" onSubmit={id ? updateMovie : onSubmit}>
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input value={movie.title} onChange={handleChange} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="director" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Director</label>
                        <input value={movie.director} onChange={handleChange} name="director" id="director" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="hasOscar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Has Oscar</label>
                        <input value={movie.hasOscar} onChange={handleChange} name="hasOscar" id="hasOscar" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <div className="flex items-center  justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                        <Link to={"/"} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Back</Link>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default NewMovie