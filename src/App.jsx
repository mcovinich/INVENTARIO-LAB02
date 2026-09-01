import { useState, useMemo } from "react";

const DATA = [
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 001",nom:"Fosfato ferroso",form:"Fe₃(PO₄)₂",marca:"nn",cant:"1000 g",frasc:1},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 002",nom:"Hierro en polvo",form:"Fe",marca:"nn",cant:"500 g",frasc:2},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 003",nom:"Sulfato de hierro (III) y amonio hidr.",form:"NH₄Fe(SO₄)₂·12H₂O",marca:"Anedra",cant:"200 g",frasc:3},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 004",nom:"Sulfato férrico",form:"Fe₂(SO₄)₃",marca:"nn",cant:"10 g",frasc:1},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 005",nom:"Sulfato ferroso",form:"FeSO₄",marca:"nn, Norte",cant:"200 g",frasc:2},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 006",nom:"Sulfato ferroso heptahidrato",form:"FeSO₄·7H₂O",marca:"Merck",cant:"500 g",frasc:1},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 007",nom:"Sulfuro ferroso",form:"FeS",marca:"nn",cant:"500 g",frasc:1},
  {cat:"Fe",catName:"Sales de Hierro",cod:"Fe 008",nom:"Hierro (III) cloruro 6 hidrato",form:"FeCl₃·6H₂O",marca:"Biopack",cant:"100 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 001",nom:"Acetato de sodio",form:"CH₃COONa",marca:"Berna, Plastgom, nn",cant:"500 g",frasc:8},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 002",nom:"Benzoato de sodio",form:"",marca:"Purest, Qca del Plata",cant:"350 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 003",nom:"Bicarbonato de sodio",form:"NaHCO₃",marca:"Anedra, nn",cant:"100 g",frasc:4},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 004",nom:"Bicromato de sodio",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 005",nom:"Bisulfito de sodio",form:"NaHSO₃",marca:"Ciccarelli",cant:"100 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 006",nom:"Borato de sodio",form:"",marca:"Timper",cant:"200 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 007",nom:"Bromuro de sodio",form:"NaBr",marca:"nn",cant:"100 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 008",nom:"Cal sodada",form:"NaOH y Ca(OH)₂",marca:"nn",cant:"500 g",frasc:3},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 009",nom:"Carbonato de sodio",form:"Na₂CO₃",marca:"nn, PF",cant:"500 g",frasc:5},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 010",nom:"Citrato de sodio",form:"C₆H₅O₇Na₃",marca:"LBN, nn",cant:"500 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 011",nom:"Citrato de sodio hidr.",form:"C₆H₅O₇Na₃·2H₂O",marca:"Ciccarelli, nn",cant:"1000 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 012",nom:"Cloruro de sodio",form:"NaCl",marca:"nn, Cicarelli, Biopack",cant:"1250 g",frasc:6},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 013",nom:"Formiato de sodio",form:"NaCHO₂",marca:"Mallinckrodt",cant:"100 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 014",nom:"Fosfato de sodio",form:"",marca:"nn, Anedra",cant:"750 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 015",nom:"Fosfato diácido de sodio",form:"",marca:"Purest",cant:"100 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 016",nom:"Fosfato disódico",form:"Na₂HPO₄",marca:"Berna",cant:"250 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 017",nom:"Fosfato trisódico",form:"",marca:"nn",cant:"500 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 018",nom:"Hidróxido de sodio",form:"NaOH",marca:"Ciccarelli, Biopack, nn",cant:"600 g / 2000 mL 1N",frasc:4},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 019",nom:"Hiposulfito de sodio",form:"Na₂S₂O₃",marca:"Rhodia",cant:"400 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 020",nom:"Nitrato de sodio",form:"NaNO₃",marca:"Biopack, nn",cant:"1250 g",frasc:3},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 021",nom:"Nitrito de sodio",form:"NaNO₂",marca:"Anedra, Plastgom, Stanton, Timper",cant:"500 g",frasc:8},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 022",nom:"Nitroprusiato de sodio",form:"Fe(CN)₅(NO)Na₂·2H₂O",marca:"Merck, nn",cant:"100 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 023",nom:"Oxalato de sodio",form:"Na₂C₂O₄",marca:"Plastgom",cant:"100 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 024",nom:"Perborato de sodio",form:"NaBO₃",marca:"nn",cant:"200 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 025",nom:"Persulfato de sodio",form:"Na₂S₂O₈",marca:"RP, Bronfield",cant:"500 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 026",nom:"Propionato de sodio",form:"CH₃CH₂COONa",marca:"Anedra",cant:"200 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 027",nom:"Sodio metálico",form:"Na",marca:"Berna",cant:"500 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 028",nom:"Sulfato de sodio",form:"Na₂SO₄",marca:"LBN, nn",cant:"1000 g",frasc:4},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 029",nom:"Sulfato de sodio anhidro",form:"Na₂SO₄",marca:"Berna, Anedra, Rhodia",cant:"1000 g",frasc:3},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 030",nom:"Tartrato de sodio y potasio",form:"NaKC₄H₄O₆·4H₂O",marca:"Biopack, LBN, nn",cant:"500 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 031",nom:"Tiosulfato de sodio",form:"Na₂S₂O₃·5H₂O",marca:"Mallinckrodt, Timper",cant:"400 g",frasc:3},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 032",nom:"Yodato de sodio",form:"NaIO₃",marca:"Berna, Anedra",cant:"100 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 033",nom:"Yoduro de sodio",form:"NaI",marca:"Mallinckrodt",cant:"100 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 034",nom:"Fluoruro de sodio",form:"NaF",marca:"Pronfie",cant:"50 g",frasc:1},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 035",nom:"Sodio metaperiodato",form:"INaO₄",marca:"Anedra",cant:"100 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 036",nom:"Tetraboricato de sodio",form:"Na₂B₄O₇·10H₂O",marca:"nn",cant:"300 g",frasc:3},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 037",nom:"Caseinato de sodio",form:"",marca:"Stantor",cant:"300 g",frasc:2},
  {cat:"Na",catName:"Sales de Sodio",cod:"Na 038",nom:"Sodio fosfato dibásico dihidratado",form:"",marca:"",cant:"100 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 001",nom:"Bifosfato de potasio",form:"KH₂PO₄",marca:"nn",cant:"100 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 002",nom:"Biftalato de potasio",form:"KHC₈H₄O₄",marca:"Anedra, nn",cant:"1000 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 003",nom:"Bromato de potasio",form:"KBrO₃",marca:"nn",cant:"50 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 004",nom:"Bromuro de potasio",form:"KBr",marca:"nn",cant:"500 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 005",nom:"Carbonato de potasio",form:"K₂CO₃",marca:"Berna",cant:"50 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 006",nom:"Clorato de potasio",form:"KClO₃",marca:"nn",cant:"500 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 007",nom:"Cromato de potasio",form:"KCrO₄",marca:"Plastgom, Retienne, nn",cant:"300 g",frasc:4},
  {cat:"K",catName:"Sales de Potasio",cod:"K 008",nom:"Dicromato de potasio",form:"K₂Cr₂O₇",marca:"LBN, Timper, Berna",cant:"150 g",frasc:3},
  {cat:"K",catName:"Sales de Potasio",cod:"K 009",nom:"Ferricianuro de potasio",form:"K₃Fe(CN)₆",marca:"Mallinckrodt",cant:"150 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 010",nom:"Ferrocianuro de potasio",form:"K₄Fe(CN)₆",marca:"Mallinckrodt, IQB, Socram, Stanton",cant:"500 g",frasc:3},
  {cat:"K",catName:"Sales de Potasio",cod:"K 011",nom:"Ferrocianuro de potasio hidr.",form:"K₄Fe(CN)₆·3H₂O",marca:"Anedra",cant:"200 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 012",nom:"Fosfato monobásico de potasio",form:"KH₂PO₄",marca:"Anedra",cant:"250 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 013",nom:"Hidróxido de potasio",form:"KOH",marca:"LBN, RP, nn, Timper",cant:"750 g",frasc:3},
  {cat:"K",catName:"Sales de Potasio",cod:"K 014",nom:"Nitrato de potasio",form:"KNO₃",marca:"nn",cant:"1000 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 015",nom:"Oxalato de potasio",form:"(COOK)₂·H₂O",marca:"Anedra",cant:"250 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 016",nom:"Periodato de potasio",form:"KIO₄",marca:"RP",cant:"20 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 017",nom:"Permanganato de potasio",form:"KMnO₄",marca:"nn",cant:"500 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 018",nom:"Sulfito de potasio",form:"K₂SO₃",marca:"Berna",cant:"100 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 019",nom:"Tiocanato de potasio",form:"KSCN",marca:"Berna",cant:"30 g",frasc:1},
  {cat:"K",catName:"Sales de Potasio",cod:"K 020",nom:"Yoduro de potasio",form:"KI",marca:"nn, Mercurio/Timper",cant:"750 g",frasc:2},
  {cat:"K",catName:"Sales de Potasio",cod:"K 021",nom:"Bisulfato de potasio",form:"KHSO₄",marca:"nn",cant:"100 g",frasc:2},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 001",nom:"Acetato de cobre",form:"",marca:"Brank, Anedra",cant:"100 g",frasc:2},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 002",nom:"Cloruro cúprico dihidrato",form:"CuCl₂·2H₂O",marca:"Mallinckrodt",cant:"300 g",frasc:1},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 003",nom:"Cloruro de cobre",form:"",marca:"Bronfield",cant:"100 g",frasc:1},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 004",nom:"Sulfato de cobre",form:"",marca:"Plastgom, Cicarelli, Berna",cant:"600 g",frasc:9},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 005",nom:"Sulfato de cobre pentahidrato",form:"CuSO₄·5H₂O",marca:"nn",cant:"50 g",frasc:2},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 006",nom:"Virutas de cobre",form:"Cu",marca:"nn",cant:"100 g",frasc:1},
  {cat:"Cu",catName:"Sales de Cobre",cod:"Cu 007",nom:"Cobre (II) óxido",form:"CuO",marca:"Biopack",cant:"100 g",frasc:1},
  {cat:"Mg",catName:"Sales de Magnesio",cod:"Mg 001",nom:"Acetato de magnesio hidr.",form:"C₄H₆MgO₄·4H₂O",marca:"Riedel, Anedra",cant:"300 g",frasc:2},
  {cat:"Mg",catName:"Sales de Magnesio",cod:"Mg 002",nom:"Óxido de magnesio",form:"MgO",marca:"Valfer",cant:"200 g",frasc:1},
  {cat:"Mg",catName:"Sales de Magnesio",cod:"Mg 003",nom:"Silicato de magnesio",form:"",marca:"nn",cant:"200 g",frasc:1},
  {cat:"Mg",catName:"Sales de Magnesio",cod:"Mg 004",nom:"Sulfato de magnesio",form:"MgSO₄",marca:"Berna, Plastgom, Timper",cant:"500 g",frasc:3},
  {cat:"Mg",catName:"Sales de Magnesio",cod:"Mg 005",nom:"Sulfato de magnesio heptahidr.",form:"MgSO₄·7H₂O",marca:"Merck",cant:"100 g",frasc:1},
  {cat:"Mg",catName:"Sales de Magnesio",cod:"Mg 006",nom:"Citrato de magnesio",form:"C₆H₆MgO₇",marca:"Stanton",cant:"100 g",frasc:1},
  {cat:"I",catName:"Yodo",cod:"I 001",nom:"Ácido periódico",form:"H₅IO₆",marca:"Merck",cant:"100 g",frasc:2},
  {cat:"I",catName:"Yodo",cod:"I 002",nom:"Monocloruro de yodo",form:"ICl",marca:"Anedra",cant:"1000 mL",frasc:1},
  {cat:"I",catName:"Yodo",cod:"I 003",nom:"Yodo sublimado sólido",form:"I₂",marca:"nn, Cicarelli",cant:"150 g",frasc:5},
  {cat:"I",catName:"Yodo",cod:"I 004",nom:"Yodoformo cristal",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"I",catName:"Yodo",cod:"I 005",nom:"Potasio yoduro",form:"",marca:"Purest",cant:"100 g",frasc:1},
  {cat:"Mn",catName:"Sales de Manganeso",cod:"Mn 001",nom:"Cloruro de manganeso",form:"MnCl₂·4H₂O",marca:"Ciccarelli",cant:"100 g",frasc:1},
  {cat:"Mn",catName:"Sales de Manganeso",cod:"Mn 002",nom:"Pirolusita",form:"",marca:"nn",cant:"500 g",frasc:1},
  {cat:"Ba",catName:"Sales de Bario",cod:"Ba 001",nom:"Carbonato de bario",form:"BaCO₃",marca:"nn",cant:"500 g",frasc:1},
  {cat:"Ba",catName:"Sales de Bario",cod:"Ba 002",nom:"Cloruro de bario",form:"BaCl₂",marca:"nn",cant:"100 g",frasc:1},
  {cat:"Ba",catName:"Sales de Bario",cod:"Ba 003",nom:"Nitrato de bario",form:"Ba(NO₃)₂",marca:"Berna",cant:"50 g",frasc:1},
  {cat:"Ba",catName:"Sales de Bario",cod:"Ba 004",nom:"Sulfato de bario",form:"BaSO₄",marca:"Anedra",cant:"500 g",frasc:1},
  {cat:"Ba",catName:"Sales de Bario",cod:"Ba 005",nom:"Hidróxido de bario",form:"Ba(OH)₂·8H₂O",marca:"Merck, nn",cant:"300 g",frasc:4},
  {cat:"Al",catName:"Sales de Aluminio",cod:"Al 001",nom:"Aluminio en polvo",form:"Al",marca:"nn",cant:"500 g",frasc:2},
  {cat:"Al",catName:"Sales de Aluminio",cod:"Al 002",nom:"Nitrato de aluminio",form:"",marca:"nn",cant:"1000 g",frasc:2},
  {cat:"Al",catName:"Sales de Aluminio",cod:"Al 003",nom:"Óxido de aluminio",form:"Al₂O₃",marca:"Merck",cant:"200 g",frasc:2},
  {cat:"Al",catName:"Sales de Aluminio",cod:"Al 004",nom:"Sulfato de aluminio",form:"Al₂(SO₄)₃",marca:"Berna",cant:"50 g",frasc:1},
  {cat:"Al",catName:"Sales de Aluminio",cod:"Al 005",nom:"Sulfato de aluminio octadecahidr.",form:"Al₂(SO₄)₃·18H₂O",marca:"Anedra",cant:"250 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 001",nom:"Acetato de amonio",form:"",marca:"nn",cant:"200 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 002",nom:"Bromuro de amonio",form:"NH₄Br",marca:"Atanor, Anedra",cant:"1000 g",frasc:3},
  {cat:"M",catName:"Sales de Amonio",cod:"M 003",nom:"Citrato de amonio",form:"(NH₄)₂HC₆H₅O₇",marca:"Mallinckrodt",cant:"100 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 004",nom:"Cloruro de amonio",form:"NH₄Cl",marca:"Mallinckrodt",cant:"2000 g",frasc:2},
  {cat:"M",catName:"Sales de Amonio",cod:"M 005",nom:"Fosfato ácido de amonio",form:"(NH₄)₂HPO₄",marca:"Berna",cant:"300 g",frasc:2},
  {cat:"M",catName:"Sales de Amonio",cod:"M 006",nom:"Fosfato de amonio",form:"",marca:"nn, Mallinckrodt",cant:"100 g",frasc:2},
  {cat:"M",catName:"Sales de Amonio",cod:"M 007",nom:"Fosfato monobásico de amonio",form:"(NH₄)H₂PO₄",marca:"nn",cant:"500 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 008",nom:"Molibdato de amonio",form:"(NH₄)₆Mo₇O₂₄·4H₂O",marca:"Merck",cant:"100 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 009",nom:"Nitrato de amonio",form:"NH₄NO₃",marca:"Mallinckrodt",cant:"500 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 010",nom:"Oxalato de amonio",form:"",marca:"nn, RP",cant:"300 g",frasc:4},
  {cat:"M",catName:"Sales de Amonio",cod:"M 011",nom:"Sulfato de amonio",form:"(NH₄)₂SO₄",marca:"Anedra, RP, nn, Cicarelli",cant:"1250 g",frasc:6},
  {cat:"M",catName:"Sales de Amonio",cod:"M 012",nom:"Sulfato ferroso de amonio",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 013",nom:"Sulfocianuro de amonio",form:"SCN(NH₄)",marca:"Anedra",cant:"1000 g",frasc:1},
  {cat:"M",catName:"Sales de Amonio",cod:"M 014",nom:"Tartrato de amonio",form:"",marca:"nn",cant:"300 g",frasc:2},
  {cat:"Ca",catName:"Sales de Calcio",cod:"Ca 001",nom:"Carbonato de calcio",form:"CaCO₃",marca:"nn",cant:"1000 g",frasc:2},
  {cat:"Ca",catName:"Sales de Calcio",cod:"Ca 002",nom:"Fosfato tricálcico",form:"",marca:"nn",cant:"1000 g",frasc:3},
  {cat:"Ca",catName:"Sales de Calcio",cod:"Ca 003",nom:"Sulfato de calcio",form:"CaSO₄·2H₂O",marca:"Mallinckrodt",cant:"400 g",frasc:1},
  {cat:"Ca",catName:"Sales de Calcio",cod:"Ca 004",nom:"Calcio cloruro 2 hidrato",form:"CaCl₂·2H₂O",marca:"Biopack",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 001",nom:"Acetato de cadmio dihidr.",form:"Cd(C₂H₃O₂)₂·2H₂O",marca:"Merck",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 002",nom:"Alúmina",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 003",nom:"Bismuto oxalato",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 004",nom:"Bromobenceno",form:"C₆H₅Br",marca:"Fluka, Merck",cant:"1250 mL",frasc:2},
  {cat:"X",catName:"Otros",cod:"X 006",nom:"Dimetilsulfóxido",form:"(CH₃)₂SO",marca:"Mallinckrodt",cant:"1000 mL",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 007",nom:"Estaño en polvo",form:"",marca:"Socram",cant:"20 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 008",nom:"Fósforo pentaóxido",form:"P₂O₅",marca:"Berna, Riedel",cant:"600 g",frasc:2},
  {cat:"X",catName:"Otros",cod:"X 009",nom:"Hidroquinona",form:"",marca:"Berna, Merck",cant:"150 g",frasc:2},
  {cat:"X",catName:"Otros",cod:"X 010",nom:"Metilo salicilato",form:"",marca:"Berna",cant:"100 mL",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 011",nom:"p-benzoquinona",form:"C₆H₄O₂",marca:"UCB",cant:"50 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 012",nom:"Sulfato de litio hidr.",form:"Li₂SO₄·H₂O",marca:"Mallinckrodt",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 013",nom:"Trioleato de glicerilo",form:"",marca:"BDH",cant:"800 mL",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 014",nom:"Virutas de bronce",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 015",nom:"Albúmina de huevo",form:"",marca:"Bromfield",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 016",nom:"Alfanaftol / α-naftol",form:"",marca:"nn, Standard",cant:"70 g",frasc:3},
  {cat:"X",catName:"Otros",cod:"X 017",nom:"Anilina",form:"",marca:"Werke, Backer",cant:"100 g / 200 mL",frasc:3},
  {cat:"X",catName:"Otros",cod:"X 018",nom:"Anilina ftalato p/ cromatografía",form:"",marca:"Merck",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 019",nom:"Azufre",form:"",marca:"nn",cant:"50 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 020",nom:"Bromofenol",form:"",marca:"Berna",cant:"1 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 021",nom:"Caseína",form:"",marca:"Fluka",cant:"250 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 022",nom:"Cloruro de mercurio",form:"",marca:"nn",cant:"50 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 023",nom:"Fehling A",form:"",marca:"Anedra",cant:"500 mL",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 024",nom:"Inaftol",form:"",marca:"Mallinckrodt",cant:"50 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 025",nom:"Mercurio metálico",form:"",marca:"nn",cant:"5 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 026",nom:"Mercurio precipitado",form:"",marca:"Berna",cant:"50 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 027",nom:"Metacrilato de metilo",form:"",marca:"nn",cant:"50 mL",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 028",nom:"Reactivo de Wijs",form:"",marca:"Tetraedrón",cant:"1000 mL",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 029",nom:"Resorcina (Resorcinol)",form:"",marca:"Parafarm",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 030",nom:"Starch hidrolizado p/ electroforesis",form:"",marca:"Fluka",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 031",nom:"Tiamina hidroclórica",form:"",marca:"Berna",cant:"100 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 032",nom:"Sílica gel",form:"60-200 mesh",marca:"Fisher",cant:"453 g",frasc:2},
  {cat:"X",catName:"Otros",cod:"X 033",nom:"Carbón activado (polvo)",form:"",marca:"nn",cant:"—",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 034",nom:"Zinc (metálico)",form:"",marca:"nn",cant:"—",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 035",nom:"Fenilhidracina Clorhidrato",form:"C₆H₅NHNH₃Cl",marca:"Anedra, Analak",cant:"25 g",frasc:2},
  {cat:"X",catName:"Otros",cod:"X 037",nom:"2-naftol",form:"",marca:"nn",cant:"200 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 038",nom:"β-naftol",form:"",marca:"nn",cant:"10 g",frasc:1},
  {cat:"X",catName:"Otros",cod:"X 039",nom:"Floril",form:"",marca:"Berna",cant:"100 g",frasc:1},
  {cat:"A",catName:"Aldehídos",cod:"A 001",nom:"4-dimetilaminobenzaldehído",form:"(CH₃)₂NC₆H₄CHO",marca:"Fluka, nn",cant:"320 g",frasc:2},
  {cat:"A",catName:"Aldehídos",cod:"A 002",nom:"Benzaldehído",form:"C₆H₅CHO",marca:"Merck, BDH",cant:"1000 mL",frasc:3},
  {cat:"A",catName:"Aldehídos",cod:"A 003",nom:"Formaldehído",form:"",marca:"Berna, Purest",cant:"2000 mL",frasc:2},
  {cat:"A",catName:"Aldehídos",cod:"A 004",nom:"Propionaldehído",form:"CH₃CH₂CHO",marca:"Fluka",cant:"800 mL",frasc:1},
  {cat:"A",catName:"Aldehídos",cod:"A 005",nom:"Guayacol",form:"",marca:"Berna",cant:"250 g",frasc:1},
  {cat:"A",catName:"Aldehídos",cod:"A 006",nom:"Vainillina",form:"",marca:"nn",cant:"120 g",frasc:3},
  {cat:"A",catName:"Aldehídos",cod:"A 007",nom:"Paraformaldehído polvo",form:"",marca:"Purest",cant:"50 g",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 001",nom:"Acetona",form:"(CH₃)₂CO",marca:"Sintorgan, nn",cant:"1200 mL",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 002",nom:"Benzofenona",form:"",marca:"Fluka",cant:"80 g",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 003",nom:"Ciclopentanona",form:"",marca:"Sigma, LBN",cant:"250 mL",frasc:3},
  {cat:"C",catName:"Cetonas",cod:"C 004",nom:"Dibenzal-acetona",form:"",marca:"nn",cant:"50 g",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 005",nom:"Dibenzal-ciclopentanona",form:"",marca:"nn",cant:"10 g",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 006",nom:"Metil-etil-cetona",form:"CH₃COCH₂CH₃",marca:"Mallinckrodt",cant:"200 mL",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 007",nom:"Metil-isobutil-cetona",form:"CH₃COCH₂CH(CH₃)₂",marca:"Sintorgan",cant:"600 mL",frasc:1},
  {cat:"C",catName:"Cetonas",cod:"C 008",nom:"Acetil acetona",form:"CH₃COCH₂COCH₃",marca:"Anedra",cant:"100 mL",frasc:1},
  {cat:"Ac",catName:"Acetatos Líquidos",cod:"Ac 001",nom:"Acetato de amilo",form:"CH₃COOC₅H₁₁",marca:"Berna, Dorwil",cant:"2000 mL",frasc:2},
  {cat:"Ac",catName:"Acetatos Líquidos",cod:"Ac 002",nom:"Acetato de butilo",form:"CH₃COOCH₂CH₂CH₂CH₃",marca:"Berna, Douglas",cant:"1800 mL",frasc:2},
  {cat:"Ac",catName:"Acetatos Líquidos",cod:"Ac 003",nom:"Acetato de etilo",form:"CH₃COOC₂H₅",marca:"Berna, nn",cant:"1800 mL",frasc:3},
  {cat:"Ac",catName:"Acetatos Líquidos",cod:"Ac 004",nom:"Acetato de metilo",form:"",marca:"Berna",cant:"300 mL",frasc:1},
  {cat:"Ac",catName:"Acetatos Líquidos",cod:"Ac 005",nom:"Acetato de anilina",form:"C₈H₁₁NO₂",marca:"Stanton",cant:"100 g",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 001",nom:"1-butanol / N-butanol",form:"CH₃(CH₂)₃OH",marca:"Merck, Anedra, Berna, LBN",cant:"1000 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 002",nom:"Glicerina",form:"CH₂OHCHOHCH₂OH",marca:"Berna, Anedra",cant:"1000 mL",frasc:2},
  {cat:"OH",catName:"Alcoholes",cod:"OH 003",nom:"Alcohol boricado",form:"",marca:"Droguería Norte",cant:"100 mL",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 004",nom:"Alcohol etílico",form:"",marca:"Biopack, Porta",cant:"1000 mL",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 005",nom:"Alcohol isobutílico",form:"",marca:"Biopack, Solanbi, Purest",cant:"1750 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 006",nom:"Alcohol metílico",form:"",marca:"Biopack",cant:"500 mL",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 007",nom:"Etiglicol",form:"",marca:"nn",cant:"100 mL",frasc:6},
  {cat:"OH",catName:"Alcoholes",cod:"OH 008",nom:"Metanol",form:"",marca:"nn, Anedra",cant:"2100 mL",frasc:5},
  {cat:"OH",catName:"Alcoholes",cod:"OH 009",nom:"Fenol",form:"C₆H₅OH",marca:"Anedra, nn",cant:"600 g",frasc:2},
  {cat:"OH",catName:"Alcoholes",cod:"OH 010",nom:"2-Propanol",form:"",marca:"Berna, nn, Mirk",cant:"2300 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 014",nom:"Terbutanol",form:"",marca:"Berna",cant:"100 mL",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 016",nom:"Alcohol amílico",form:"",marca:"Crelarux, Berna, Ceblaco",cant:"2000 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 017",nom:"Alcohol isopropílico",form:"",marca:"nn, Salambi, Berna, Purest",cant:"1900 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 018",nom:"Alcohol bencílico",form:"",marca:"Anedra, Raudo, Berna, Parafarm, M&B",cant:"2500 mL",frasc:6},
  {cat:"OH",catName:"Alcoholes",cod:"OH 019",nom:"Alcohol isoamílico",form:"",marca:"Salambi, Berna, Sigma",cant:"2500 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 020",nom:"N-propanol / Alcohol propílico",form:"",marca:"Merck, Purest, Sintorgan",cant:"2500 mL",frasc:4},
  {cat:"OH",catName:"Alcoholes",cod:"OH 021",nom:"2-pentanol",form:"",marca:"nn",cant:"100 mL",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 022",nom:"Alcohol terc-amílico",form:"",marca:"nn",cant:"100 mL",frasc:1},
  {cat:"OH",catName:"Alcoholes",cod:"OH 023",nom:"Alcohol sec-butílico",form:"",marca:"Berna",cant:"1300 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 001",nom:"Ácido acético",form:"CH₃COOH",marca:"Qca del Plata, nn",cant:"3000 mL",frasc:1},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 002",nom:"Ácido acético glacial",form:"CH₃COOH",marca:"Raudo, Berna, LBN",cant:"800 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 003",nom:"Ácido fórmico",form:"CH₂O₂",marca:"Berna, Douglas",cant:"1800 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 004",nom:"Ácido monocloroacético",form:"CH₂ClCOOH",marca:"Mallinckrodt",cant:"1000 mL",frasc:1},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 005",nom:"Ácido tricloroacético",form:"CCl₃COOH",marca:"Mallinckrodt, Berna",cant:"300 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 006",nom:"Ácido clorhídrico",form:"HCl",marca:"nn",cant:"500 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 007",nom:"Ácido fosfórico",form:"H₃PO₄",marca:"Bernalgel Argentina",cant:"1000 mL",frasc:1},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 008",nom:"Ácido nítrico",form:"HNO₃",marca:"nn",cant:"100 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 009",nom:"Ácido sulfúrico",form:"H₂SO₄",marca:"nn",cant:"100 mL",frasc:1},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 010",nom:"Ácido clorhídrico 10% V/V",form:"HCl",marca:"Biopack",cant:"2000 mL",frasc:2},
  {cat:"AA",catName:"Ácidos Líquidos",cod:"AA 011",nom:"Ácido clorhídrico 36,5-38%",form:"HCl",marca:"Cicarelli",cant:"500 mL",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 001",nom:"Ácido adípico",form:"C₆H₁₀O₄",marca:"Anedra",cant:"1000 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 002",nom:"Ácido aminoacético",form:"H₂NCH₂COOH",marca:"Thomas, Mallinckrodt",cant:"125 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 003",nom:"Ácido antranílico",form:"NH₂C₆H₄COOH",marca:"Fluka",cant:"100 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 004",nom:"Ácido benzoico",form:"C₆H₅COOH",marca:"Biopack, RP, Palcor, nn",cant:"1400 g",frasc:7},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 005",nom:"Ácido cromotrópico",form:"(HO)₂C₁₀H₄(SO₃H)₂",marca:"Riedel",cant:"50 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 006",nom:"Ácido dinitro-3,5-benzoico",form:"(NO₂)₂C₆H₃COOH",marca:"Fluka",cant:"100 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 007",nom:"Ácido esteárico",form:"C₁₈H₃₆O₂",marca:"Purest",cant:"500 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 008",nom:"EDTA",form:"",marca:"Berna, nn",cant:"220 g",frasc:3},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 009",nom:"Ácido ftálico",form:"(COOH)₂C₆H₄",marca:"RP",cant:"150 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 010",nom:"Ácido glutámico",form:"C₅H₉NO₄",marca:"Mallinckrodt",cant:"450 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 011",nom:"Ácido L-glutámico",form:"",marca:"RP, BDH",cant:"200 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 012",nom:"Ácido maleico",form:"C₄H₄O₄",marca:"Purest",cant:"200 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 013",nom:"Ácido molíbdico",form:"MoO₃·H₂O",marca:"Mallinckrodt, BDH",cant:"600 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 014",nom:"Ácido p-aminobenzoico",form:"H₂NC₆H₄COOH",marca:"Mallinckrodt, Fluka",cant:"200 g",frasc:2},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 015",nom:"Ácido pícrico",form:"C₆H₂OH(NO₂)₃",marca:"Anedra, nn",cant:"2350 g",frasc:3},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 016",nom:"Ácido piválico",form:"(CH₃)₃CCOOH",marca:"Fluka",cant:"50 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 017",nom:"Ácido succínico",form:"C₄H₆O₄",marca:"Anedra, Lowens, Merck, nn",cant:"1500 g",frasc:7},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 018",nom:"Ácido sulfanílico",form:"NH₂C₆H₄SO₃·H₂O",marca:"Mallinckrodt",cant:"1300 g",frasc:5},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 019",nom:"Ácido tartárico",form:"C₄H₆O₆",marca:"Qca del Plata, nn",cant:"700 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 020",nom:"Ácido úrico",form:"C₅H₄N₄O₃",marca:"nn",cant:"10 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 021",nom:"Ácido ascórbico",form:"C₆H₈O₆",marca:"",cant:"100 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 022",nom:"Ácido cítrico",form:"C₆H₈O₇",marca:"Anedra",cant:"250 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 023",nom:"Ácido salicílico",form:"C₇H₆O₃",marca:"nn",cant:"50 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 024",nom:"Ácido silicílico",form:"Si(OH)₄",marca:"Mallinckrodt",cant:"450 g",frasc:1},
  {cat:"AS",catName:"Ácidos Sólidos",cod:"AS 025",nom:"Fenilalanina",form:"",marca:"Socram",cant:"100 g",frasc:1},
  {cat:"AN",catName:"Anhídridos",cod:"AN 001",nom:"Anhídrido acético",form:"",marca:"Berna, Sintorgan, Mallinckrodt, nn",cant:"3500 mL",frasc:9},
  {cat:"AN",catName:"Anhídridos",cod:"AN 002",nom:"Anhídrido ftálico",form:"C₆H₄(CO)₂O",marca:"Berna, Timper, Anedra, nn",cant:"1300 mL",frasc:7},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 001",nom:"Hexametilenamina",form:"C₆H₁₃N",marca:"Fluka",cant:"1000 mL",frasc:1},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 002",nom:"L-lisina monoclorohidrato",form:"",marca:"BDH, Anedra",cant:"50 g",frasc:1},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 003",nom:"Nitrobenceno",form:"C₆H₅NO₂",marca:"Sintorgan",cant:"1000 mL",frasc:1},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 005",nom:"Urea",form:"",marca:"nn, Fluka, Stanton",cant:"1000 mL / 750 g",frasc:6},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 006",nom:"4-((p-nitrofenil)azo)resorcinol",form:"",marca:"Fluka",cant:"25 g",frasc:2},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 007",nom:"Amoníaco",form:"",marca:"nn",cant:"200 mL",frasc:1},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 008",nom:"Nitrato de plata",form:"AgNO₃",marca:"nn",cant:"25 g",frasc:2},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 009",nom:"Acetanilida",form:"C₆H₅NHCOCH₃",marca:"LBN, Mallinckrodt",cant:"300 g",frasc:1},
  {cat:"N",catName:"Aminas y Nitrogenados",cod:"N 010",nom:"2,4-dinitrofenil hidrazina",form:"",marca:"nn, RP, AnalaR",cant:"105 g",frasc:3},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 001",nom:"Antraceno",form:"C₁₄H₁₀",marca:"Merck",cant:"200 g",frasc:1},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 002",nom:"Benceno",form:"C₆H₆",marca:"Anedra",cant:"2400 mL",frasc:4},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 003",nom:"Ciclohexano",form:"C₆H₁₂",marca:"BDH, Carlo Erba",cant:"1700 mL",frasc:4},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 004",nom:"Hexanos",form:"C₆H₁₄",marca:"Dorwil, Cicarelli",cant:"1600 mL",frasc:4},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 005",nom:"Naftaleno",form:"C₁₀H₈",marca:"Mallinckrodt, nn",cant:"700 g",frasc:2},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 006",nom:"Bencidina",form:"",marca:"Btochtn",cant:"25 g",frasc:4},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 007",nom:"Éter de petróleo",form:"",marca:"Anedra",cant:"10 mL",frasc:1},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 008",nom:"Éter etílico",form:"",marca:"Biopack",cant:"50 mL",frasc:1},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 010",nom:"Tolueno",form:"",marca:"nn, Berna",cant:"200 mL",frasc:2},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 011",nom:"Xileno",form:"",marca:"nn",cant:"100 mL",frasc:1},
  {cat:"HC",catName:"Hidrocarburos",cod:"HC 012",nom:"N-decano",form:"",marca:"Sigma",cant:"100 mL",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 001",nom:"Auramina",form:"",marca:"Merck",cant:"50 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 002",nom:"Difenil-carbazida",form:"",marca:"nn",cant:"100 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 003",nom:"Fenozafranina",form:"",marca:"Fluka",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 004",nom:"Timol",form:"C₁₀H₁₄O",marca:"Purest",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 005",nom:"Azul de Evans",form:"",marca:"Biocientífica",cant:"5 mL",frasc:3},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 006",nom:"Azul de metileno",form:"",marca:"nn",cant:"40 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 007",nom:"Cristal violeta",form:"",marca:"Mallinckrodt",cant:"50 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 008",nom:"Eosina",form:"",marca:"nn",cant:"10 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 009",nom:"Giemsa",form:"",marca:"nn",cant:"1000 mL",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 010",nom:"Negro Sudán",form:"",marca:"Standard",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 011",nom:"Negro Sudán B",form:"",marca:"Merck",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 012",nom:"Nihidrina",form:"",marca:"Anedra",cant:"50 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 013",nom:"O-Toluidina",form:"",marca:"RPN",cant:"250 mL",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 014",nom:"Sudán III",form:"",marca:"nn",cant:"trazas",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 015",nom:"Bromo cresol purple",form:"",marca:"Mallinckrodt",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 016",nom:"Naranja G",form:"",marca:"Purest",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 017",nom:"Timolftaleína",form:"",marca:"nn, Lowens",cant:"10 g",frasc:3},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 018",nom:"Azul alcoli 6B",form:"",marca:"Mallinckrodt",cant:"10 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 019",nom:"Floroglucina",form:"",marca:"Carlo Erba",cant:"10 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 020",nom:"Rojo fenol",form:"",marca:"Svenska",cant:"10 g",frasc:3},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 021",nom:"Negro de eriocromo T",form:"",marca:"Lowens",cant:"10 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 022",nom:"Negro de naftaleno",form:"",marca:"Sintorgan",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 023",nom:"Azul brillante de Coomassie",form:"",marca:"Anedra",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 024",nom:"Nigrosina",form:"",marca:"Anedra",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 025",nom:"Amaranto",form:"",marca:"W. Brank",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 026",nom:"Amarillo de dimetilo",form:"",marca:"May & Baker",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 027",nom:"Bromo fenol azul",form:"",marca:"nn, Bruxeless",cant:"5 g",frasc:2},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 028",nom:"Cromotropo",form:"",marca:"nn",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 029",nom:"Amarillo ocaso",form:"",marca:"Standard",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 030",nom:"Fenolftaleína",form:"",marca:"Purest",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 031",nom:"Azul brillante",form:"",marca:"CRB",cant:"5 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 032",nom:"Azul de naftol",form:"",marca:"Mallinckrodt",cant:"20 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 033",nom:"Negro de amido",form:"",marca:"Standard",cant:"25 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 034",nom:"Azul de tornasol",form:"",marca:"nn",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 035",nom:"Amarillo George",form:"",marca:"Eosin",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 036",nom:"Azul de anilina",form:"",marca:"Anedra",cant:"50 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 037",nom:"Rojo crisol",form:"",marca:"Standard",cant:"50 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 038",nom:"Azul de tornasol (2)",form:"",marca:"nn",cant:"10 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 039",nom:"Alizarina",form:"",marca:"Berna",cant:"20 g",frasc:1},
  {cat:"IC",catName:"Indicadores y Colorantes",cod:"IC 040",nom:"Rojo congo",form:"",marca:"nn",cant:"10 g",frasc:1},
  {cat:"NU",catName:"Ácidos Nucleicos",cod:"NU 001",nom:"Ácido ribonucleico de levadura",form:"",marca:"Lowen",cant:"5 g",frasc:1},
  {cat:"NU",catName:"Ácidos Nucleicos",cod:"NU 002",nom:"Adenina",form:"",marca:"Sigma, Fluka",cant:"15 g",frasc:3},
  {cat:"NU",catName:"Ácidos Nucleicos",cod:"NU 003",nom:"Citosina",form:"",marca:"Sigma",cant:"5 g",frasc:1},
  {cat:"NU",catName:"Ácidos Nucleicos",cod:"NU 004",nom:"Guanina",form:"",marca:"Lowens",cant:"5 g",frasc:1},
  {cat:"NU",catName:"Ácidos Nucleicos",cod:"NU 005",nom:"Uracilo",form:"",marca:"Merck",cant:"5 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 001",nom:"Almidón soluble",form:"",marca:"Droguería Norte",cant:"100 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 002",nom:"Arabinosa",form:"",marca:"Sigma",cant:"25 g",frasc:2},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 003",nom:"Celulosa",form:"",marca:"nn",cant:"20 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 004",nom:"DEAE celulosa",form:"",marca:"SS Schull",cant:"100 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 005",nom:"Dextrosa",form:"",marca:"Mallinckrodt, Curress",cant:"150 g",frasc:2},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 006",nom:"Galactosa",form:"",marca:"nn",cant:"40 g",frasc:2},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 007",nom:"Glucógeno",form:"",marca:"Sigma",cant:"50 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 008",nom:"Manosa",form:"",marca:"Mallinckrodt",cant:"50 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 009",nom:"Xilosa",form:"",marca:"ICN",cant:"100 g",frasc:1},
  {cat:"CH",catName:"Carbohidratos",cod:"CH 010",nom:"Dextrosa anhidra",form:"C₆H₁₂O₆",marca:"Biopack",cant:"250 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 001",nom:"Histidina clorhidrato monohidratado",form:"",marca:"Anedra",cant:"100 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 002",nom:"Clorhidrato de lisina",form:"",marca:"BA Berna",cant:"150 g",frasc:2},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 003",nom:"Cisteína",form:"",marca:"Biopack",cant:"50 g",frasc:2},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 004",nom:"Tirosina",form:"",marca:"Anedra",cant:"50 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 005",nom:"Arginina",form:"",marca:"Anedra",cant:"50 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 006",nom:"Monoclorhidrato de L-Ornitina",form:"",marca:"",cant:"50 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 007",nom:"Creatinina",form:"",marca:"",cant:"—",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 008",nom:"Albúmina de huevo",form:"",marca:"",cant:"100 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 009",nom:"Caseína",form:"",marca:"",cant:"100 g",frasc:1},
  {cat:"AP",catName:"Aminoácidos y Proteínas",cod:"AP 010",nom:"Gelatina",form:"",marca:"",cant:"—",frasc:2},
];

const CATEGORIES = [...new Map(DATA.map(d => [d.cat, {code: d.cat, name: d.catName}])).values()];

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function StockBadge({ cant, frasc }) {
  const num = parseFloat(cant) || 0;
  const isLow = frasc <= 1 && num <= 50;
  const isMedium = frasc <= 2 && num <= 200;
  const bg = !cant || cant === "—" ? "#e0e0e0" : isLow ? "#fce4e4" : isMedium ? "#fff3e0" : "#e6f4ea";
  const color = !cant || cant === "—" ? "#888" : isLow ? "#c62828" : isMedium ? "#e65100" : "#2e7d32";
  const label = !cant || cant === "—" ? "Sin datos" : isLow ? "Bajo" : isMedium ? "Medio" : "Disponible";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: bg, color, padding: "3px 8px", borderRadius: 6,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: color,
      }} />
      {label}
    </span>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [expandedItem, setExpandedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = DATA;
    if (selectedCat !== "all") items = items.filter(d => d.cat === selectedCat);
    if (search.trim()) {
      const q = normalize(search.trim());
      items = items.filter(d =>
        normalize(d.nom).includes(q) ||
        normalize(d.cod).includes(q) ||
        normalize(d.form).includes(q) ||
        normalize(d.marca).includes(q)
      );
    }
    return items;
  }, [search, selectedCat]);

  const currentCatLabel = selectedCat === "all"
    ? "Todas las categorías"
    : `${selectedCat} – ${CATEGORIES.find(c => c.code === selectedCat)?.name}`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f4f3",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: "#1a2e2a",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a4a3a 0%, #2d6b57 100%)",
        padding: "24px 16px 20px",
        color: "white",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 22 }}>🧪</span>
            <span style={{ fontSize: 13, letterSpacing: 2, opacity: 0.7, fontWeight: 500 }}>LABORATORIO 02</span>
          </div>
          <h1 style={{ margin: "2px 0 14px", fontSize: 20, fontWeight: 600, lineHeight: 1.2 }}>
            Inventario de Reactivos
          </h1>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Buscar por nombre, código, fórmula o marca..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10,
                border: "none", fontSize: 15, background: "rgba(255,255,255,0.95)",
                color: "#1a2e2a", outline: "none", boxSizing: "border-box",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <span style={{
              position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
              fontSize: 18, opacity: 0.4, pointerEvents: "none",
            }}>🔍</span>
            {search && (
              <button onClick={() => setSearch("")} style={{
                position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                background: "#ddd", border: "none", borderRadius: "50%",
                width: 22, height: 22, cursor: "pointer", fontSize: 12, color: "#666",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
            )}
          </div>

          {/* Dropdown categoría */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 10,
                border: "2px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.12)", color: "white",
                fontSize: 14, fontWeight: 500, cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxSizing: "border-box", textAlign: "left",
              }}
            >
              <span>{currentCatLabel}</span>
              <span style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s", fontSize: 12,
              }}>▼</span>
            </button>

            {dropdownOpen && (
              <>
                <div
                  onClick={() => setDropdownOpen(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 199 }}
                />
                <div style={{
                  position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                  background: "white", borderRadius: 10, maxHeight: 320, overflowY: "auto",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 200,
                }}>
                  <button
                    onClick={() => { setSelectedCat("all"); setDropdownOpen(false); }}
                    style={{
                      width: "100%", padding: "11px 14px", border: "none", cursor: "pointer",
                      background: selectedCat === "all" ? "#e6f4ea" : "transparent",
                      color: "#1a2e2a", fontSize: 14, textAlign: "left",
                      fontWeight: selectedCat === "all" ? 600 : 400,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    Todas las categorías ({DATA.length})
                  </button>
                  {CATEGORIES.map(c => {
                    const count = DATA.filter(d => d.cat === c.code).length;
                    return (
                      <button
                        key={c.code}
                        onClick={() => { setSelectedCat(c.code); setDropdownOpen(false); }}
                        style={{
                          width: "100%", padding: "11px 14px", border: "none", cursor: "pointer",
                          background: selectedCat === c.code ? "#e6f4ea" : "transparent",
                          color: "#1a2e2a", fontSize: 14, textAlign: "left",
                          fontWeight: selectedCat === c.code ? 600 : 400,
                          borderBottom: "1px solid #f0f0f0",
                          display: "flex", justifyContent: "space-between",
                        }}
                      >
                        <span><b style={{ fontWeight: 600 }}>{c.code}</b> – {c.name}</span>
                        <span style={{ color: "#8aaa9e", fontSize: 13 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 12px" }}>
        {/* Results count */}
        <div style={{
          padding: "12px 4px 8px", fontSize: 13, color: "#5a7a70", fontWeight: 500,
        }}>
          {filtered.length} reactivo{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </div>

        {/* Results */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 80 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#8aaa9e" }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🔬</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>No se encontraron reactivos</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Probá con otro término de búsqueda</div>
            </div>
          )}
          {filtered.map((d, i) => {
            const isExpanded = expandedItem === d.cod + i;
            return (
              <div
                key={d.cod + i}
                onClick={() => setExpandedItem(isExpanded ? null : d.cod + i)}
                style={{
                  background: "white", borderRadius: 10, padding: "12px 14px",
                  cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "all 0.15s",
                  borderLeft: `4px solid ${isExpanded ? "#2d6b57" : "#c8ddd5"}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                      <span style={{
                        background: "#e8f0ec", color: "#1a4a3a", padding: "2px 8px",
                        borderRadius: 5, fontSize: 12, fontWeight: 700, fontFamily: "monospace",
                        letterSpacing: 0.5,
                      }}>{d.cod}</span>
                      <StockBadge cant={d.cant} frasc={d.frasc} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginTop: 4 }}>{d.nom}</div>
                    {d.form && (
                      <div style={{ fontSize: 13, color: "#5a7a70", marginTop: 2, fontStyle: "italic" }}>{d.form}</div>
                    )}
                    <div style={{ fontSize: 12, color: "#8aaa9e", marginTop: 3 }}>
                      {d.cant && d.cant !== "—" ? `${d.cant}` : ""}{d.cant && d.cant !== "—" ? " · " : ""}{d.frasc} frasco{d.frasc !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 11, color: "#aac4ba", transition: "transform 0.15s",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    marginLeft: 8, marginTop: 4,
                  }}>▼</span>
                </div>

                {isExpanded && (
                  <div style={{
                    marginTop: 10, paddingTop: 10,
                    borderTop: "1px solid #e8f0ec",
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px",
                  }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#8aaa9e", fontWeight: 600 }}>Marca</div>
                      <div style={{ fontSize: 14, marginTop: 1 }}>{d.marca || "—"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#8aaa9e", fontWeight: 600 }}>Cantidad registrada</div>
                      <div style={{ fontSize: 14, marginTop: 1 }}>{d.cant || "—"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#8aaa9e", fontWeight: 600 }}>Frascos</div>
                      <div style={{ fontSize: 14, marginTop: 1 }}>{d.frasc}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#8aaa9e", fontWeight: 600 }}>Categoría</div>
                      <div style={{ fontSize: 14, marginTop: 1 }}>{d.cat} – {d.catName}</div>
                    </div>
                    {d.form && (
                      <div style={{ gridColumn: "1 / -1" }}>
                        <div style={{ fontSize: 11, color: "#8aaa9e", fontWeight: 600 }}>Fórmula</div>
                        <div style={{ fontSize: 16, marginTop: 1, fontFamily: "serif" }}>{d.form}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        textAlign: "center", padding: "16px", fontSize: 11, color: "#8aaa9e",
        background: "#e8f0ec",
      }}>
        Inventario de Reactivos — Laboratorio 02 · Solo consulta
      </div>
    </div>
  );
}
