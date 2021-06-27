# 1. Feladat
## Ellenőrizd a telepített NodeJS verziószámát!
megoldás: node -v

# 2. Feladat
## Ellenőrizd a telepített npm verziószámát!
megoldás: npm -v

# 3. Feladat
## Listázd ki a projekted függőségeit! Csak az első szint kell, a telepített csomagok függőségei nem!
megoldás: npm ls --depth=0

# 4. Feladat
## Írasd ki a konzolra az eslint csomag adatait!
megoldás: npm view eslint

# 5. Feladat
## Kérdezd le az projekted elavult csomagjait, és ha van találat, frissítsd őket!
megoldás:
- elavult csomagok: npm outdated
- elavult csomagok frissítése: npm update