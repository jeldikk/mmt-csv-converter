# -*- coding: utf-8 -*-
"""
@author: jeldikk
"""
from .header import mmtheader
from .exceptions import ImproperDataType, ImproperDataValue
from .dataframe import mmtFrame, mmtCMOScan


class mmtwrapper(object):
    def __init__(self, fname, mode="rb", *args, **kwargs):

        try:
            self.__fp = open(fname, mode)
        except FileNotFoundError as error:
            raise error

        try:
            self.__head = mmtheader(hdata=self.fp.read(128))

        except Exception as error:
            raise error

        lp = self.fp.seek(0, 2)
        self.totframes = lp // self.head.framesize
        self.totscans = lp // self.head.scansize
        self.__cnter = 1
        self.__fname = fname

    @property
    def fp(self):
        return self.__fp

    @property
    def name(self):
        return self.__fname

    @property
    def head(self):
        return self.__head

    @property
    def nbeams(self):
        return self.head.nbeams

    def __iter__(self):
        return self

    def __next__(self):
        if self.__cnter > self.totscans:
            raise StopIteration
        else:
            pz = self.__cnter
            self.__cnter += 1
            return self.getScanCycle(pz)

    def close(self):
        self.fp.close(0)

    def resetpointer(self):
        self.fp.seek(0)

    def about(self):
        ft = self.getScanCycle(1).timestamp
        lt = self.getScanCycle(self.totscans).timestamp
        print(
            """
    Details:
    ________
    FileName:%s
    FirstScan:%s, LastScan:%s
    TotalScans: %d
    PW:%d, IPP:%d, NFFT:%d, NCI:%d, NICI:%d, NRGB:%d
              """
            % (
                self.name,
                ft,
                lt,
                self.totscans,
                self.head.pw,
                self.head.ipp,
                self.head.nfft,
                self.head.nci,
                self.head.nici,
                self.head.nrgb,
            )
        )

    def getScanCycle(self, scanno):
        if not isinstance(scanno, int):
            raise ImproperDataType("scanno should be an int")
        if scanno < 1 or scanno > self.totscans:
            raise ImproperDataValue(
                "improper scanno value occurred either out of bound value"
            )
        self.fp.seek((scanno - 1) * self.head.scansize)
        _fl = list()
        for i in range(self.nbeams):
            ff = self.getFrame((scanno - 1) * self.nbeams + (i + 1))
            _fl.append(ff)
        f = mmtCMOScan(*_fl)
        return f

    def getFrame(self, frameno):
        if not isinstance(frameno, int):
            raise ImproperDataType("frameno should be an int")
        if frameno < 1 or frameno > self.totframes:
            raise ImproperDataValue(
                "Improper data Value occurred out of bounds value")
        self.fp.seek((frameno - 1) * self.head.framesize)
        _temph = mmtheader(self.fp.read(128))
        f = mmtFrame(_temph)
        f.raw_conv(self.fp.read(self.head.datasize))
        return f
