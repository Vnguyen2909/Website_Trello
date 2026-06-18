import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createSearchParams, useNavigate } from "react-router-dom";
import { fetchBoardsAPI } from "~/apis";
import { useDebounceFn } from "~/customHook/useDebounceFn";

function AutoCompleteSearchBoard() {
  const navigate = useNavigate();

  //State xu ly hien thi ket qua fetch tu API
  const [open, setOpen] = useState(false);
  // State lưu trữ danh sách board fetch về được
  //State save list board fetch
  const [boards, setBoards] = useState(null);
  // Hien loading khi call api fetch boards
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Khi close list => clear board(null)
    if (!open) {
      setBoards(null);
    }
  }, [open]);

  //Xu ly nhan data nhap vao tu input va goi API => lay ket qua cho vao useDebounceFn
  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value;
    if (!searchValue) return;
    console.log(searchValue);

    // createSearchParams tao searchPath chuan voi q[title] de call API
    const searchPath = `?${createSearchParams({ "q[title]": searchValue })}`;
    console.log(searchPath);

    // Call API...
    setLoading(true);
    fetchBoardsAPI(searchPath)
      .then((res) => {
        setBoards(res.boards || []);
      })
      .finally(() => {
        //Luu y ve viec setLoading ve false luon phai chay trong finally() de du co loi hay khong thi cung khong hiet loading nua
        setLoading(false);
      });
  };
  // Boc ham handleInputSearchChange o tren vao useDebounceFn va cho delay khoang 1s sau khi dung go phim
  const debounceSearchBoard = useDebounceFn(handleInputSearchChange, 500);

  // Khi select mot cai board cu the => dieu huong toi board do
  const handleSelectedBoard = (event, selectedBoard) => {
    //Kiem tra ton tai mot cai board duoc select thi moi goi dieu huong - navigate
    console.log(selectedBoard);
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      //Text hien ra khi board la null hoac sau khi fetch boards []
      noOptionsText={!boards ? "Type to search board..." : "No board found!"}
      //Cum handle ve viec dong mo ket qua search
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      // getOptionLabel: Thuc hien Autocomplete lay title cua board va hien thi
      getOptionLabel={(board) => board.title}
      //Options cua Autocomplete : Dau vao la 1 Array ma board ban dau can cho null de lam cai noOptionsText (them cai || [] vao)
      options={boards || []}
      //Fix warning cua MUI, vi Autocomplete mac dinh chon gia tri xay ra khi so sanh object
      //Mac du co 2 json objects trong nhu nhau nhung khi compare se ra fale => Can compare chuan voi value theo dang Primitive
      //Dung String_id thay vi compare toan bo cai json
      //Link fix: https://stackoverflow.com/a/65347275/8324172
      isOptionEqualToValue={(option, value) => option._id === value._id}
      loading={loading}
      //onInputChange se run khi go noi dung vao Input, can lam debounce tranh viec spam call API
      onInputChange={debounceSearchBoard}
      // onChange cai Autocomplete run khi select ket qua
      onChange={handleSelectedBoard}
      // Render ra cái thẻ input để nhập nội dung tìm kiếm
      //Render the input de nhap noi dung search
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            ".MuiSvgIcon-root": { color: "white" },
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearchBoard;
