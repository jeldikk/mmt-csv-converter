import numpy as np
import datetime
import struct

from .exceptions import ImproperDataType, ImproperHeaderLength

HEADER_FIELDS = ('npar', 'baudlength', 'nrgb', 'nfft', 'nci', 'nici', 'ipp', 'pw', 'codeflag', 'nwin', 'w1start', 'w1len', 'w2start', 'w2len', 'year', 'month', 'day', 'hour',
                 'min', 'sec', 'nbeams', 'beam', 'scancycle', 'attn', 'noise', 'nrej', 'pth1d', 'txpower', 'winfn', 'nomit', 'dtype', 'ver', 'gwind', 'gwdir', 'temp', 'humid', 'comment')


class mmtheader(object):
    def __init__(self, hdata=None, *args, **kwargs):
        if hdata is None:
            self._header = dict()
            self._header["baudlength"] = kwargs.get("baudlength")
            self._header["ipp"] = kwargs.get("ipp")
            self._header["pw"] = kwargs.get("pw")
            self._header["nci"] = kwargs.get("nci")
            self._header["nfft"] = kwargs.get("nfft")
            self._header["nici"] = kwargs.get("nici")
            self._header["scancycle"] = kwargs.get("scancycle")
            self._header["comment"] = kwargs.get("comment")
            self._header["w1start"] = kwargs.get("w1start")
            self._header["w1len"] = kwargs.get("w1len")
            self._header["nrgb"] = kwargs.get("nrgb")
            self._header["nbeams"] = kwargs.get("nbeams")
            self._header["beam"] = kwargs.get("beam")
            self.timestamp = kwargs.get("timestamp")
            self.beamAngles = {"ele": kwargs.get(
                "ele"), "az": kwargs.get("az")}
        else:

            if not isinstance(hdata, bytes):
                raise ImproperDataType(
                    "Raw header data should be of bytes type")
            if len(hdata) != 128:
                raise ImproperHeaderLength(
                    "Header data length should be of 128bytes")
            _tempdata = struct.unpack("32h4f48s", hdata)
            self._header = dict(
                (x, y) for x, y in zip(HEADER_FIELDS, _tempdata)
            )
            self.timestamp = datetime.datetime(
                year=self.year,
                month=self.month,
                day=self.day,
                hour=self.hour,
                minute=self.min,
                second=self.sec,
            )
            # print('after timestamp')
        # print(kwargs)
        # print('self.header',self._header)
        # print('beam Angles are ',self.beamAngles)
        self.hoffset = self.w1start * 0.15
        # This is the frequency window
        self.fd = 1 / (self.nci * self.ipp * 1e-6)
        self.freq_res = self.fd / self.nfft  # This is the frequency resolution
        self.rangeticks = (
            np.arange(0, self.nrgb) * self.baudlength * 0.15 + self.hoffset
        )
        self.heightticks = (
            self.rangeticks
        )  # * np.cos(self.beamAngles['ele']*(np.pi/180))#np.arange(0,self.nrgb)*self.baudlength*0.15 + self.hoffset
        self.timeticks = np.arange(self.nfft) * self.ipp * 1e-6 * self.nci
        self.freqticks = (
            np.linspace(-self.nfft / 2, self.nfft / 2 -
                        1, self.nfft) * self.freq_res
        )
        self.datasize = self.nrgb * 5 * 4
        self.framesize = self.datasize + 128
        self.scansize = self.framesize * self.nbeams

        # print('I am in mmtheader at last')

    @property
    def head(self):
        return self._header

    def __getattr__(self, attr):
        return self._header[attr]

    def getTicks(self):
        return self.timeticks, self.heightticks, self.freqticks

    def __beam2angle(self, beamno):
        beam = str(beamno)
