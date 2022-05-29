import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";
import CastList from "./CastList";

function AddUpdateForm(props) {
  const {
    showModal,
    closeAddForm,
    formStatus,
    checkMethod,
    onInputChange,
    title,
    trailerUrl,
    imgUrl,
    synopsis,
    rating,
    genres,
    checkedItemsGenre,
    onInputChangeForGenre,
    checkedItemsCast,
    casts,
    onInputChangeForCast,
    searchCast,
    searchForCast,
    isCastLoaded
  } = props;

  return (
    <>
      {/* Modal for Add Movie */}
      <Modal
        size="regular"
        active={showModal}
        toggler={() => closeAddForm()}
        className="w-2/3"
      >
        <ModalHeader toggler={() => closeAddForm()}>
          {formStatus} Movie{" "}
          <span className="text-white">--------------------------</span>
        </ModalHeader>
        <form onSubmit={(e) => checkMethod(e)}>
          <ModalBody>
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Trailer URL"
              name="trailerUrl"
              value={trailerUrl}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Image URL"
              name="imgUrl"
              value={imgUrl}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <Textarea
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Synopsis"
              name="synopsis"
              value={synopsis}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>
            <Input
              type="number"
              color="lightBlue"
              size="regular"
              outline={true}
              placeholder="Rating"
              name="rating"
              value={rating}
              onChange={(e) => onInputChange(e)}
            />
            <br></br>

            <p className="font-bold mb-2">Genre</p>
            <div className="flex justify-center items-center gap-5 flex-wrap border-2 rounded-xl p-2">
              {genres.map((elGenre, index) => (
                <div key={index} className="w-1/5">
                  <input
                    type="checkbox"
                    name={elGenre.name}
                    id={elGenre.name}
                    checked={checkedItemsGenre[elGenre.name] || false}
                    value={elGenre.id}
                    onChange={onInputChangeForGenre}
                  />
                  <label htmlFor={elGenre.name}> {elGenre.name}</label>
                </div>
              ))}
            </div>

            <div className="flex flex-nowrap justify-between items-end mb-2">
              <p className="font-bold mb-2 mt-5">Cast</p>
              <div className="w-2/6">
                <Input
                  type="text"
                  color="blue"
                  size="sm"
                  outline={true}
                  placeholder="Search By Cast"
                  name="searchCast"
                  value={searchCast}
                  onChange={(e) => searchForCast(e)}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-5 flex-wrap h-56 w-full overflow-y-scroll border-2 rounded-xl p-2">
             <CastList casts={casts} onInputChangeForCast={onInputChangeForCast} checkedItemsCast={checkedItemsCast} isCastLoaded={isCastLoaded}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={(e) => closeAddForm()}
              className="text-red-800 hover:bg-red-100 hover:shadow-xl focus:outline-none py-2 px-5 rounded-lg"
            >
              Close
            </button>

            <Button color="green" ripple="light">
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default AddUpdateForm;
