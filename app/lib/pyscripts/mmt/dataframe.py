from collections import OrderedDict
import csv
import os
import numpy as np

from .utils import calculate_angle, raw_conv

from .header import mmtheader
from .exceptions import (
    ImproperHeaderType,
    ImproperDataType,
    ImproperDataLength,
    ImproperData,
)


class mmtBase(object):
    def __init__(self, head, kl):
        if not isinstance(head, mmtheader):
            raise ImproperHeaderType("Expected a mmtheader")
        if not isinstance(kl, list):
            raise ImproperDataType("Expected keylist to be a list")

        self.__head = head
        self.__kl = kl

    @property
    def head(self):
        return self.__head

    @property
    def keylist(self):
        return self.__kl

    @property
    def data(self):
        return self.__dta

    @data.setter
    def data(self, d):
        if not isinstance(d, OrderedDict):
            raise TypeError("data should be an OrderedDict")
        self.__dta = OrderedDict()
        for key in self.keylist:
            if not d.get(key) is None:
                if not isinstance(d.get(key), np.ndarray):
                    raise ImproperDataType("data should be a ndarray")
                if len(d.get(key).shape) != 1:
                    raise ImproperDataLength("Each value should be of 1D")
                self.__dta[key] = d.get(key)
            else:
                raise ImproperData("None cannot be a data content")


class mmtFrame(mmtBase):
    def __init__(self, head, *args, **kwargs):
        _kl = ["snr", "totpwr", "dop", "dopwidth", "noise"]

        super().__init__(head, _kl, *args, **kwargs)

    @property
    def beam(self):
        return self.head.beam

    def raw_conv(self, rdata):
        if len(rdata) != 5 * self.head.nrgb * 4:
            raise ImproperDataLength("rawdata is wrong length")
        snr, totpwr, dop, dopwidth, noise = raw_conv(rdata)
        _tmpdata = OrderedDict()
        _tmpdata["snr"] = snr
        _tmpdata["totpwr"] = totpwr
        _tmpdata["dop"] = dop
        _tmpdata["dopwidth"] = dopwidth
        _tmpdata["noise"] = noise
        self.data = _tmpdata
        self.init()

    def init(self):
        self.__snr = 10 ** (self.data.get("snr") / 10)
        self.__radv = -2.83 * (self.data.get("dop"))

    @property
    def snr_watts(self):
        return self.__snr

    @property
    def vr(self):
        return self.__radv

    @property
    def snr(self):
        return self.data.get("snr")

    @property
    def doppler(self):
        return self.data.get("dop")

    @property
    def dopplerwidth(self):
        return self.data.get("dopwidth")

    def toCSVfile(self, foldername):
        fname = foldername + self.head.timestamp.strftime(
            "mmtD%Y%m%dT%H%M%S.csv"
        )
        with open(fname, "w", newline="") as csvfile:
            fieldnames = ["Height(kms)", "doppler",
                          "radial_vel", "dop_width", "SNR"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for h, dop, vr, dopw, snr in zip(
                self.head.heightticks,
                self.doppler,
                self.vr,
                self.dopplerwidth,
                self.snr,
            ):
                writer.writerow(
                    dict(
                        zip(
                            fieldnames,
                            [
                                round(h, 3),
                                round(dop, 3),
                                round(vr, 3),
                                round(dopw, 3),
                                round(snr, 3),
                            ],
                        )
                    )
                )


class mmtCMOScan(object):
    def __init__(self, *args, **kwargs):
        if len(args) == 0 or len(args) < 5:
            raise ValueError('argument list cannot be empty')
        self.east = args[0]
        self.west = args[1]
        self.zenith = args[2]
        self.north = args[3]
        self.south = args[4]
        self.__ht = self.east.head.heightticks
        self.__time = self.zenith.head.timestamp

    @property
    def timestamp(self):
        return self.__time

    @property
    def ht(self):
        return self.__ht

    @property
    def snr(self):
        return self.__snr

    @property
    def east(self):
        return self.__est

    @east.setter
    def east(self, f):
        if not isinstance(f, mmtFrame):
            raise ImproperDataType('Improper Frame instance occurred')
        if f.beam != 110 and f.head.beamAngles['az'] != 0:
            raise ValueError('Beam information mismatch occurred')
        if f.data is None:
            raise ValueError('Each Frame data cannot be empty')
        self.__est = f

    @property
    def west(self):
        return self.__wst

    @west.setter
    def west(self, f):
        if not isinstance(f, mmtFrame):
            raise ImproperDataType('Improper Frame instance occurred')
        if f.beam != 210 and f.head.beamAngles['az'] != 180:
            raise ValueError('Beam information mismatch occurred')
        if f.data is None:
            raise ValueError('Each Frame data cannot be empty')
        self.__wst = f

    @property
    def zenith(self):
        return self.__znth

    @zenith.setter
    def zenith(self, f):
        if not isinstance(f, mmtFrame):
            raise ImproperDataType('Improper Frame instance occurred')
        if f.beam != 1 and not (f.head.beamAngles['ele'] == 0 and f.head.beamAngles['az'] == 0):
            raise ValueError('Beam information mismatch occurred')
        if f.data is None:
            raise ValueError('Each Frame data cannot be empty')
        self.__znth = f

    @property
    def north(self):
        return self.__nth

    @north.setter
    def north(self, f):
        if not isinstance(f, mmtFrame):
            raise ImproperDataType('Improper Frame instance occurred')
        if f.beam != 310 and f.head.beamAngles['az'] != 90:
            raise ValueError('Beam information mismatch occurred')
        if f.data is None:
            raise ValueError('Each Frame data cannot be empty')
        self.__nth = f

    @property
    def south(self):
        return self.__sth

    @south.setter
    def south(self, f):
        if not isinstance(f, mmtFrame):
            raise ImproperDataType('Improper Frame instance occurred')
        if f.beam != 410 and f.head.beamAngles['az'] != 270:
            raise ValueError('Beam information mismatch occurred')
        if f.data is None:
            raise ValueError('Each Frame data cannot be empty')
        self.__sth = f

    def calcSNR(self):
        self.__snr = 10*np.log10((self.east.snr_watts+self.west.snr_watts +
                                 self.north.snr_watts+self.south.snr_watts)/4)
        return self

    def calcUVW(self):
        self.__zon = (self.east.vr-self.west.vr)/(2*np.sin(10*(np.pi/180)))
        self.__mer = (self.north.vr-self.south.vr)/(2*np.sin(10*(np.pi/180)))
        self.__ver = self.zenith.vr
        self.__vel = np.sqrt(self.__mer**2 + self.__zon**2)
        return self

    @property
    def U(self):
        return self.__zon

    @property
    def V(self):
        return self.__mer

    @property
    def W(self):
        return self.__ver

    @property
    def direction(self):
        return self.__dr

    @property
    def velocity(self):

        return self.__vel

    def calcDir(self, method='met'):
        _tmpdata = np.empty(self.U.shape, dtype=self.U.dtype)
        for i in range(len(self.U)):
            _t = calculate_angle(self.U[i], self.V[i], method=method)
            _tmpdata[i] = _t
        self.__dr = _tmpdata
        return self

    def toCSVfile(self, foldername):
        fname = foldername + os.sep + \
            self.zenith.head.timestamp.strftime('uvwD%Y%m%dT%H%M%S.csv')
        with open(fname, 'w', newline='') as csvfile:
            fieldnames = ['Height(kms)', 'U(mps)', 'V(mps)',
                          'W(mps)', 'WD(deg)', 'Z_snr(db)', 'Z_dop']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for h, u, v, w, d, z_snr, z_dop in zip(self.ht, self.U, self.V, self.W, self.direction, self.zenith.snr, self.zenith.doppler):
                writer.writerow({
                    'Height(kms)': round(h, 2),
                    'U(mps)': round(u, 2),
                    'V(mps)': round(v, 2),
                    'W(mps)': round(w, 2),
                    'WD(deg)': round(d, 2),
                    'Z_snr(db)': round(z_snr, 2),
                    'Z_dop': round(z_dop, 2)
                })
