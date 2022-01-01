import numpy as np
import struct


def raw_conv(rd):
    nrgb = len(rd) // 20
    # print('nrgb',nrgb)
    snr = np.empty((nrgb,), dtype=np.float32)
    totpwr = np.empty((nrgb,), dtype=np.float32)
    dop = np.empty((nrgb,), dtype=np.float32)
    dopwidth = np.empty((nrgb,), dtype=np.float32)
    noise = np.empty((nrgb,), dtype=np.float32)
    # print(snr.shape)
    for rgb in range(nrgb):
        snr[rgb], totpwr[rgb], dop[rgb], dopwidth[rgb], noise[rgb] = struct.unpack(
            "5f", rd[rgb * 5 * 4: (rgb + 1) * 5 * 4]
        )
    return snr, totpwr, dop, dopwidth, noise


def calculate_angle(u, v, method='met'):
    fac = (180/np.pi)

    _t = None
    try:
        if method == 'at2':

            _t = fac*np.arctan2(v, u)
            if _t < 0:
                _t += 360
        elif method == 'met':
            tuv = fac*np.arctan(u/v)
            if (u > 0 and v > 0):
                _t = 180+tuv
            elif (u > 0 and v < 0):
                _t = 360+tuv  # 360+tuv
            elif (u < 0 and v < 0):
                # print('<,<')
                _t = tuv
            elif (u < 0 and v > 0):
                # print('<,>')
                _t = 180+tuv  # 180+tuv

        elif method == 'mat':
            tuv = fac*np.arctan(abs(u)/abs(v))
            tvu = fac*np.arctan(abs(v)/abs(u))
            if u > 0 and v > 0:
                _t = tuv
            elif u > 0 and v < 0:
                _t = 90+tvu
            elif u < 0 and v < 0:
                _t = 180+tuv
            else:
                _t = 270+tvu

            _t += 180
            while _t > 360:
                _t = _t - 360

    except:
        _t = np.nan
    finally:
        return _t
