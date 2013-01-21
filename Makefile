##############################
# Definitions
##############################
NAMESPACE = Blockly.core
GSS_RENAME = NONE
DEBUG_FLAG = -f --define -f goog.DEBUG=false
PRETTY_PRINT = --pretty-print
FORMATTING.WHITESPACE_ONLY = -f --formatting -f PRETTY_PRINT

SRC_DIR = core
OUT_DIR = build
GEN_DIR = gen

SOY_COMPILER = ../closure-templates-read-only/build/SoyToJsSrcCompiler.jar
SOY_FLAGS = --cssHandlingScheme GOOG --useGoogIsRtlForBidiGlobalDir --shouldProvideRequireSoyNamespaces --shouldGenerateGoogMsgDefs 

GSS_COMPILER = ../closure-stylesheets-read-only/build/closure-stylesheets.jar
GSS_FLAGS = $(PRETTY_PRINT) --output-renaming-map-format CLOSURE_COMPILED --rename $(GSS_RENAME) --allowed-unrecognized-property user-select

SOY_FILES = $(wildcard $(SRC_DIR)/*.soy)
GEN_SOY_JS_FILES = $(patsubst $(SRC_DIR)/%, $(GEN_DIR)/%.js, $(SOY_FILES))

RAW_JS_FILES = $(filter-out %/blockly_renaming_map.js, $(wildcard $(SRC_DIR)/*.js))
GEN_RAW_JS_FILES = $(patsubst $(SRC_DIR)/%, $(GEN_DIR)/%, $(RAW_JS_FILES))

GSS_FILES = $(wildcard $(SRC_DIR)/*.gss)
GEN_GSS_RENAMING_MAP = $(GEN_DIR)/renaming_map.js
GEN_BLOCKLY_GSS_RENAMING_MAP = $(GEN_DIR)/blockly_renaming_map.js
CORE_BLOCKLY_GSS_RENAMING_MAP = core/blockly_renaming_map.js
GSS_CSS = media/blockly.css
GEN_GSS_JS_FILES = $(GEN_BLOCKLY_GSS_RENAMING_MAP)
OUT_GSS_FILES = $(GSS_CSS)

CLOSURE_DIR = ../closure-library-read-only
CLOSURE_COMPILER_DIR = ../closure-compiler-read-only
CLOSURE_COMPILER = $(CLOSURE_COMPILER_DIR)/build/compiler.jar
CLOSURE_BUILDER = $(CLOSURE_DIR)/closure/bin/build/closurebuilder.py
CLOSURE_ROOTS = $(CLOSURE_DIR) $(SRC_DIR)
CLOSURE_ROOT_FLAGS = $(foreach root, $(CLOSURE_ROOTS), --root $(root))
CLOSURE_FLAGS = -o compiled

GEN_JS_FILES = $(GEN_SOY_JS_FILES) $(GEN_RAW_JS_FILES) $(GEN_GSS_JS_FILES)
GEN_FILES = $(GEN_JS_FILES)
OUT_JS_FILES = $(foreach comp_level, $(COMPILATION_LEVELS), $(patsubst %.js, %-$(comp_level).js, $(OUT_DIR)/$(NAMESPACE).js))
OUT_COPY_FILES = $(patsubst $(SRC_DIR)/%, $(OUT_DIR)/%, $(wildcard $(SRC_DIR)/*.html))
OUT_FILES = $(OUT_JS_FILES) $(OUT_GSS_FILES) $(OUT_COPY_FILES) $(CORE_BLOCKLY_GSS_RENAMING_MAP)


COMPILERS = $(SOY_COMPILER) $(CLOSURE_COMPILER) $(GSS_COMPILER)

COMPILATION_LEVELS = WHITESPACE_ONLY SIMPLE_OPTIMIZATIONS ADVANCED_OPTIMIZATIONS

##############################
# Rules
##############################
all: $(OUT_FILES) compiled

compiled: blockly_compressed.js blockly_core_deps.js blockly_core.js

clean:
	-rm -f $(GEN_JS_FILES) $(OUT_JS_FILES) $(OUT_GSS_FILES)
	-rm -rf $(OUT_DIR) $(GEN_DIR)

$(SOY_COMPILER): ../closure-templates-read-only/java/src/com/google/template/soy/SoyToJsSrcCompiler.java
	(cd ../closure-templates-read-only; ant SoyToJsSrcCompiler)

$(CLOSURE_COMPILER): ../closure-compiler-read-only/src/com/google/javascript/jscomp/*
	(cd ../closure-compiler-read-only; ant jar)

$(GSS_COMPILER): ../closure-stylesheets-read-only/src/com/google/common/css/*
	(cd ../closure-stylesheets-read-only; ant jar)

$(OUT_DIR)/.exists $(GEN_DIR)/.exists:
	-mkdir $(@D)
	touch $@

.INTERMEDIATE: $(addsuffix .tmp, $(GEN_SOY_JS_FILES))
$(GEN_SOY_JS_FILES): $(GEN_DIR)/%.js : $(SRC_DIR)/% $(SOY_COMPILER) $(GEN_DIR)/.exists
	java -jar $(SOY_COMPILER) $(SOY_FLAGS) --outputPathFormat $@.tmp --srcs $<
	perl -pi -e 's/soy/goog.soy/g; s/soydata/soy.data/g' $@.tmp
	cp $@.tmp $@

$(GEN_RAW_JS_FILES): $(GEN_DIR)/% : $(SRC_DIR)/% $(GEN_DIR)/.exists
	cp $< $@

$(OUT_COPY_FILES): $(OUT_DIR)/% : $(SRC_DIR)/% $(OUT_DIR)/.exists
	cp $< $@

.INTERMEDIATE: $(addsuffix .tmp, $(GEN_BLOCKLY_GSS_RENAMING_MAP))
$(GEN_BLOCKLY_GSS_RENAMING_MAP): $(GEN_GSS_RENAMING_MAP) $(GEN_DIR)/.exists
	echo "goog.provide('Blockly.renaming_map');" > $@.tmp
	cat $< >> $@.tmp
	mv $@.tmp $@

$(GEN_GSS_RENAMING_MAP): $(GSS_CSS) $(GEN_DIR)/.exists

.INTERMEDIATE: $(addsuffix .tmp, $(GEN_CSS) $(GEN_GSS_RENAMING_MAP))
$(GSS_CSS): $(GSS_FILES) $(GSS_COMPILER) $(GEN_DIR)/.exists
	java -jar $(GSS_COMPILER) $(GSS_FLAGS) --output-renaming-map $(GEN_GSS_RENAMING_MAP).tmp --output-file $(GSS_CSS).tmp $(GSS_FILES)
	mv $(GEN_GSS_RENAMING_MAP).tmp $(GEN_GSS_RENAMING_MAP)
	mv $(GSS_CSS).tmp $(GSS_CSS)

.INTERMEDIATE: $(addsuffix .tmp, $(OUT_JS_FILES))
$(OUT_JS_FILES): $(OUT_DIR)/$(NAMESPACE)-%.js : blockly_core.js $(GEN_FILES) $(CLOSURE_COMPILER) $(GEN_BLOCKLY_GSS_RENAMING_MAP) $(OUT_DIR)/.exists
	python $(CLOSURE_BUILDER) $(DEBUG_FLAG) -c $(CLOSURE_COMPILER) $(CLOSURE_ROOT_FLAGS) $(CLOSURE_FLAGS) -f --compilation_level -f $* $(FORMATTING.$*) --namespace $(NAMESPACE) --output_file $@.tmp $<
	mv $@.tmp $@

$(CORE_BLOCKLY_GSS_RENAMING_MAP): $(GEN_BLOCKLY_GSS_RENAMING_MAP)
	cp $< $@

blockly_compressed.js: $(OUT_DIR)/$(NAMESPACE)-SIMPLE_OPTIMIZATIONS.js
	cp $< $@

.INTERMEDIATE: blockly_core_deps.js.tmp
blockly_core_deps.js: blockly_core.js $(SRC_DIR)/*.js
	$(CLOSURE_DIR)/closure/bin/build/depswriter.py $(foreach root, $(CLOSURE_ROOTS), --root_with_prefix "$(root) $(root)") $< --output_file $@.tmp
	perl -pi -e "s|'([^/]+?.js)'|'../../../blockly/\\1'|;s|'core/|'../../../blockly/core/|;s|'.*?/closure/goog/|'|; s|'$(CLOSURE_DIR)|'../../..|;" $@.tmp
	mv $@.tmp $@

blockly_core.js: $(SRC_DIR)/*.js
	env PYTHONPATH=$$PYTHONPATH:$(CLOSURE_DIR)/closure/bin/build python requireprovides.py core/*.js -p Blockly.core -o $@
