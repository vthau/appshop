import CallAPI from './../utils/CallAPI';
import readStorage from './../utils/readStorage';

export const fetchCateRequest = () => {
  return dispatch => {
    CallAPI('', 'GET', null).then(res => {
      dispatch(fetchCate(res.data.type));
    });
  };
};

export const fetchCate = cate => {
  return {
    type: 'FETCH_CATE',
    payload: cate,
  };
};

export const fetchTopProductRequest = () => {
  return dispatch => {
    CallAPI('', 'GET', null).then(res => {
      dispatch(fetchTopProduct(res.data.product));
    });
  };
};

export const fetchTopProduct = topProduct => {
  return {
    type: 'FETCH_TOP_PRODUCT',
    payload: topProduct,
  };
};

export const fetchCartFromAsyncStorage = () => {
  return dispatch => {
    readStorage('cart').then(res => {
      dispatch(fetchCart(res));
    });
  };
};

export const fetchCart = cart => {
  return {
    type: 'FETCH_CART',
    payload: cart,
  };
};

export const addCate = cate => {
  return {
    type: 'ADD_CATE',
    payload: cate,
  };
};

export const addCart = product => {
  return {
    type: 'ADD_CART',
    payload: product,
  };
};

export const updateCart = product => {
  return {
    type: 'UPDATE_CART',
    payload: product,
  };
};

export const deleteProductFromCart = id => {
  return {
    type: 'DELETE_PRODUCT_FROM_CART',
    payload: id,
  };
};

export const signed = data => {
  return {
    type: 'SIGNED',
    payload: data,
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
  };
};

export const checkToken = () => {
  return async dispatch => {
    const resp = await readStorage('signed');

    if (resp !== null) {
      const {token} = resp;

      CallAPI('/check_login.php', 'POST', JSON.stringify({token}))
        .then(res => {
          if (res.data !== 'TOKEN_KHONG_HOP_LE') {
            dispatch(signed(res.data));
          }
        })
        .catch(() => {
          console.log('error check login');
        });
    }
  };
};

export const refreshToken = () => {
  return async dispatch => {
    const resp = await readStorage('signed');

    if (resp !== null) {
      const {token} = resp;
      setInterval(() => {
        CallAPI('/refresh_token.php', 'POST', JSON.stringify({token}))
          .then(res => {
            if (res.data !== 'TOKEN_KHONG_HOP_LE') {
              dispatch(updateToken(res.data));
            }
          })
          .catch(() => {
            console.log('error check login');
          });
      }, 5000);
    }
  };
};

export const updateToken = token => {
  return {
    type: 'UPDATE_TOKEN',
    payload: token,
  };
};

export const actChangeInfo = info => {
  return async dispatch => {
    const resp = await readStorage('signed');

    if (resp !== null) {
      const {token} = resp;
      const {name, phone, address} = info;

      CallAPI(
        '/change_info.php',
        'POST',
        JSON.stringify({token, name, phone, address}),
      )
        .then(res => {
          if (res.data !== 'TOKEN_KHONG_HOP_LE') {
            dispatch(updateInfo(res.data));
            return true;
          }
        })
        .catch(() => {
          return false;
          console.log('error check login');
        });
    }
  };
};

export const updateInfo = info => {
  return {
    type: 'UPDATE_INFO',
    payload: info,
  };
};

export const fetchProductCateRequest = (id, page) => {
  return dispatch => {
    CallAPI(
      `/product_by_type.php?id_type=${id}&page=${page}`,
      'GET',
      null,
    ).then(res => {
      dispatch(initProductCate(res.data));
    });
  };
};

export const initProductCate = product => {
  return {
    type: 'INIT_PRODUCT_CATE',
    payload: product,
  };
};

export const searchRequest = keyword => {
  return dispatch => {
    CallAPI(`/search.php?key=${keyword}`, 'GET', null).then(res => {
      if (typeof res.data === 'object') {
        dispatch(addSearch(res.data));
      } else {
        dispatch(addSearch([]));
      }
    });
  };
};

export const addSearch = product => {
  return {
    type: 'ADD_SEARCH',
    payload: product,
  };
};

export const fetchHistory = () => {
  return async dispatch => {
    const resp = await readStorage('signed');

    if (resp !== null) {
      const {token} = resp;

      CallAPI('/order_history.php', 'POST', JSON.stringify({token}))
        .then(res => {
          if (res.data !== 'LOI') {
            dispatch(initOrderHistory(res.data));
          }
        })
        .catch(() => {
          console.log('error check login');
        });
    }
  };
};

export const initOrderHistory = history => {
  return {
    type: 'INIT_HISTORY',
    payload: history,
  };
};

export const sendOrder = arrayDetail => {
  return async dispatch => {
    const resp = await readStorage('signed');

    if (resp !== null) {
      const {token} = resp;

      CallAPI('/cart.php', 'POST', JSON.stringify({token, arrayDetail}))
        .then(res => {
          console.log(res.data);
        })
        .catch(() => {
          console.log('error check login');
        });
    }
  };
};
