import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../plugins/firebase";
import { RiDeleteBin5Line, RiEditLine } from 'react-icons/ri'
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  const getMovies = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const arrayList = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setMovies(arrayList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const deleteMovie = async (id: string) => {
    try {
      const targetMovie = doc(db, "movies", id);
      await deleteDoc(targetMovie)
      getMovies();

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className="relative m-10">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl">Moview</h3>
        <Link to="/new" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          New Moview
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Director
            </th>
            <th scope="col" className="px-6 py-3">
              has Oscar
            </th>
            <th scope="col" className="px-6 py-3">
              Release Date
            </th>
            <th scope="col" className="px-6 py-3">
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie: any) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={movie.id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {movie.title}
              </th>
              <td className="px-6 py-4">{movie.director}</td>
              <td className="px-6 py-4">{movie.hasOscar ? "Yes" : "No"}</td>
              <td className="px-6 py-4">{movie.releaseDate}</td>
              <td className="px-6 py-4 cursor-pointer flex gap-2" >
                <RiDeleteBin5Line onClick={() => deleteMovie(movie.id)} />
                <Link to={`/edit?id=${movie.id}`}><RiEditLine /></Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
